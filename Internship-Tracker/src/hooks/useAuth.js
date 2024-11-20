// src/hooks/useAuth.js
import { useState, useEffect } from 'react';

// Custom hook for authentication
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if the user is logged in (e.g., check local storage, cookies, or session)
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser)); // Set user if found
    }
  }, []);

  const login = (userData) => {
    // Handle login logic here, e.g., API call
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData); // Update the state with the user data
  };

  const logout = () => {
    // Handle logout logic here, e.g., clear session or tokens
    localStorage.removeItem('user');
    setUser(null); // Update the state to null (logged out)
  };

  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
