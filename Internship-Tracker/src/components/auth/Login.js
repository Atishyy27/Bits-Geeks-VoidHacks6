import React, { useState } from 'react';
import styles from './Login.module.css';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../api/authAPI';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      if (response.data.success) {
        // Redirect to the appropriate dashboard based on user role
        if (response.data.role === 'intern') history.push('/intern-dashboard');
        if (response.data.role === 'mentor') history.push('/mentor-dashboard');
        if (response.data.role === 'admin') history.push('/admin-dashboard');
        if (response.data.role === 'industry-mentor') history.push('/industry-mentor-dashboard');
      }
    } catch (err) {
      setError('Invalid credentials, please try again');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
