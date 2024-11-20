import React, { useState } from 'react';
import { signupUser } from '../api/authAPI'; // Backend call to register user

const Signup = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    role: '', // 'intern', 'mentor', 'admin', 'industry-mentor'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signupUser(userData);
      if (response.data.success) {
        // Redirect to login page after successful signup
        history.push('/login');
      }
    } catch (err) {
      setError('Error signing up, please try again');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <select name="role" onChange={handleChange} value={userData.role}>
          <option value="">Select Role</option>
          <option value="intern">Intern</option>
          <option value="mentor">Mentor</option>
          <option value="admin">Admin</option>
          <option value="industry-mentor">Industry Mentor</option>
        </select>
        {error && <p>{error}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
