import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reports = () => {
  const [trainees, setTrainees] = useState([]);
  const [modules, setModules] = useState([]);
  const [trades, setTrades] = useState([]);
  const [selectedTrainee, setSelectedTrainee] = useState('');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedTrade, setSelectedTrade] = useState('');
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [traineesRes, modulesRes, tradesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/trainees'),
          axios.get('http://localhost:5000/api/modules'),
          axios.get('http://localhost:5000/api/trades'),
        ]);
        setTrainees(traineesRes.data);
        setModules(modulesRes.data);
        setTrades(tradesRes.data);
        console.log('Trades fetched:', tradesRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data for reports');
      }
    };

    fetchData();
  }, []);

  const generateReport = async (e) => {
    e.preventDefault();
    setReportData(null);
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/reports/generate', {
        trainee_id: selectedTrainee,
        module_id: selectedModule,
        trade_id: selectedTrade,
      });

      setReportData(res.data);
    } catch (err) {
      setError('Failed to generate report. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Reports Generation</h2>

      <form onSubmit={generateReport}>
        <div>
          <label>Select Trainee:</label>
          <select
            value={selectedTrainee}
            onChange={(e) => setSelectedTrainee(e.target.value)}
            required
          >
            <option value="">Select Trainee</option>
            {trainees.map((trainee) => (
              <option key={trainee.id || trainee.trainee_id} value={trainee.id || trainee.trainee_id}>
                {trainee.first_name} {trainee.last_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Module:</label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            required
          >
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module.id || module.module_id} value={module.id || module.module_id}>
                {module.name || module.module_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Trade:</label>
          <select
            value={selectedTrade}
            onChange={(e) => setSelectedTrade(e.target.value)}
            required
          >
            <option value="">Select Trade</option>
            {trades.length > 0 ? (
              trades.map((trade) => (
                <option key={trade.id || trade.trade_id} value={trade.id || trade.trade_id}>
                  {trade.name || trade.trade_name}
                </option>
              ))
            ) : (
              <option disabled>Loading trades...</option>
            )}
          </select>
        </div>

        <button type="submit">Generate Report</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {reportData && (
        <div>
          <h3>Generated Report</h3>
          <pre>{JSON.stringify(reportData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Reports;
