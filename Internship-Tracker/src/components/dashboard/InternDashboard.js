import React from 'react';
import { Link } from 'react-router-dom';

const InternDashboard = () => {
  return (
    <div>
      <h2>Intern Dashboard</h2>
      <ul>
        <li><Link to="/fortnightly-report">Submit Fortnightly Report</Link></li>
        <li><Link to="/monthly-report">Submit Monthly Report</Link></li>
        <li><Link to="/mentor-assistance">Request Mentor Assistance</Link></li>
        <li><Link to="/live-location">Send Live Location</Link></li>
      </ul>
    </div>
  );
};

export default InternDashboard;
