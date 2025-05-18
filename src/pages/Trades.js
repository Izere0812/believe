import React, { useState } from 'react';
import axios from 'axios';

const Trades = () => {
  const [tradeName, setTradeName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterTrade = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Make POST request to register trade
      const res = await axios.post('http://localhost:5000/api/trades', { trade_name: tradeName, description });

      if (res.status === 201 || res.data.message === 'Trade registered successfully') {
        setSuccess('Trade registration successful!');
        setTimeout(() => {
          // Optionally, you could redirect or clear form here
        }, 1500); // Delay for feedback message
      } else {
        setError(res.data.error || 'Trade registration failed. Please try again.');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server error during registration.');
    }
  };

  return (
    <div className="container">
      <h2>Trades Management</h2>
      <form onSubmit={handleRegisterTrade}>
        <input
          type="text"
          placeholder="Trade Name"
          value={tradeName}
          onChange={(e) => setTradeName(e.target.value)}
          required
        /><br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        /><br />

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Register Trade</button>
      </form>
      
    </div>
  );
};

export default Trades;
