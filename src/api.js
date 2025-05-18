import axios from 'axios';
import './assets/style.css';


const api = axios.create({
  baseURL: 'http://localhost:5000', // Backend server base URL
  withCredentials: true // Include cookies if needed
});

export default api;
