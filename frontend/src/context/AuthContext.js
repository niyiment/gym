// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const loadUser = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Check if token is expired
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token is expired
            logout();
          } else {
            // Token is valid, get current user
            const response = await authService.getCurrentUser();
            setCurrentUser(response.data);
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      const { token, id, email, name, role } = response.data;

      // Store token and user info in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ id, email, name, role }));

      // Set user in context
      setCurrentUser({ id, email, name, role });
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to login. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(userData);
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to register. Please try again.';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const isAdmin = () => {
    return currentUser?.role === 'ADMIN';
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
