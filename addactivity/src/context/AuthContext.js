// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await axios.post('/auth/login', { username, password });
      setUser(response.data);
      navigate('/main');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  const signup = async (username, email, password) => {
    try {
      await axios.post('/auth/signup', { username, email, password });
      alert('Account created successfully');
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
