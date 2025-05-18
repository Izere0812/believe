import { Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Auth/Dashboard';
import Modules from './pages/Modules';
import Trades from './pages/Trades';
import Trainees from './pages/Trainees';
import Marks from './pages/Marks';
import Reports from './pages/Reports';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/modules" element={<Modules />} />
      <Route path="/trades" element={<Trades />} />
      <Route path="/trainees" element={<Trainees />} />
      <Route path="/marks" element={<Marks />} />
      <Route path="/reports" element={<Reports />} />
    </Routes>
  );
};

export default AppRoutes;
