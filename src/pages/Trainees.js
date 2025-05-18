import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trainees = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [tradeId, setTradeId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [trades, setTrades] = useState([]);
  const [existingTrainees, setExistingTrainees] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trades');
        if (Array.isArray(res.data)) {
          setTrades(res.data);
        } else {
          setError('Invalid trades data received from server.');
        }
      } catch (err) {
        console.error('Error fetching trades:', err);
        setError('Failed to load trades.');
      }
    };

    const fetchTrainees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/trainees');
        setExistingTrainees(res.data);
      } catch (err) {
        console.error('Error fetching trainees:', err);
      }
    };

    fetchTrades();
    fetchTrainees();
  }, []);

  const handleRegisterTrainee = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const traineeExists = existingTrainees.some(
      (trainee) =>
        trainee.first_name === firstName &&
        trainee.last_name === lastName &&
        trainee.gender === gender
    );

    if (traineeExists) {
      setError('A trainee with the same name and gender already exists.');
      return;
    }

    const traineeData = {
      first_name: firstName,
      last_name: lastName,
      gender,
      trade_id: tradeId,
    };

    try {
      const res = await axios.post('http://localhost:5000/api/trainees', traineeData);

      if (res.status === 201 || res.data.message === 'Trainee registered successfully') {
        setSuccess('Trainee registration successful!');
        setFirstName('');
        setLastName('');
        setGender('');
        setTradeId('');
      } else {
        setError(res.data.error || 'Trainee registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.error || 'Server error during registration.');
    }
  };

  return (
    <div className="container">
      <h2>Trainees Management</h2>
      <form onSubmit={handleRegisterTrainee}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br />

        {/* Gender Radio Buttons */}
        <div>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === 'Male'}
              onChange={() => setGender('Male')}
              required
            /> Male
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              value="Female"
              checked={gender === 'Female'}
              onChange={() => setGender('Female')}
              required
            /> Female
          </label>
        </div><br />

        {/* Trade Dropdown */}
        <select
          value={tradeId}
          onChange={(e) => setTradeId(e.target.value)}
          required
        >
          <option value="">Select Trade</option>
          {trades.length > 0 ? (
            trades.map((trade) => (
              <option
                key={trade.id || trade.trade_id}
                value={trade.id || trade.trade_id}
              >
                {trade.name || trade.trade_name}
              </option>
            ))
          ) : (
            <option disabled>Loading trades...</option>
          )}
        </select><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Register Trainee</button>
      </form>
    </div>
  );
};

export default Trainees;
