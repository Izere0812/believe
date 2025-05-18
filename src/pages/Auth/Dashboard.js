import React from 'react';
import { useAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';


const Dashboard = () => {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1 className="logo">SOS_MIS</h1>
        <ul className="nav-links">
          
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <header className="dashboard-header">
        <h2>Welcome, {authData?.username || 'Guest'}!</h2>
        <p className="subheading">Manage your school's student results efficiently.</p>
      </header>

      <section className="dashboard-grid">
        <div className="card" onClick={() => navigate('/modules')}>
          <h3>Modules</h3>
          <p>View or add modules</p>
        </div>
        <div className="card" onClick={() => navigate('/trades')}>
          <h3>Trades</h3>
          <p>Manage trades offered</p>
        </div>
        <div className="card" onClick={() => navigate('/trainees')}>
          <h3>Trainees</h3>
          <p>Add or edit trainees</p>
        </div>
        <div className="card" onClick={() => navigate('/marks')}>
          <h3>Marks</h3>
          <p>Record and view marks</p>
        </div>
        <div className="card" onClick={() => navigate('/reports')}>
          <h3>Reports</h3>
          <p>Generate performance reports</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
