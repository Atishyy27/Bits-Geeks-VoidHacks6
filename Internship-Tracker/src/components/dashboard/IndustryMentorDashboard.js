import React from 'react';
import { Link } from 'react-router-dom';

const IndustryMentorDashboard = () => {
  return (
    <div>
      <h2>Industry Mentor Dashboard</h2>
      <ul>
        <li><Link to="/assign-tasks">Assign Tasks</Link></li>
        <li><Link to="/evaluate-performance">Evaluate Performance</Link></li>
        <li><Link to="/send-feedback">Send Feedback</Link></li>
      </ul>
    </div>
  );
};

export default IndustryMentorDashboard;
