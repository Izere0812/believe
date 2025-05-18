import React, { createContext, useState, useContext, useEffect } from 'react';

// Creating the AuthContext
const AuthContext = createContext();

// AuthProvider to wrap around the application
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    // You could fetch saved authentication data from local storage or API here
    const savedData = JSON.parse(localStorage.getItem('authData'));
    if (savedData) {
      setAuthData(savedData);
    }
  }, []);

  const login = (userData) => {
    setAuthData(userData);
    localStorage.setItem('authData', JSON.stringify(userData)); // Save to local storage
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData'); // Remove from local storage
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
