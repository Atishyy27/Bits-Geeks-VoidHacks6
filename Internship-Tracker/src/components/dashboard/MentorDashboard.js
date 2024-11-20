import React from 'react';
import { Link } from 'react-router-dom';

const MentorDashboard = () => {
  return (
    <div>
      <h2>Mentor Dashboard</h2>
      <ul>
        <li><Link to="/report-evaluation">Evaluate Reports</Link></li>
        <li><Link to="/intern-location">Request Intern's Location</Link></li>
        <li><Link to="/manage-interns">Manage Interns</Link></li>
        <li><Link to="/query-resolver">Resolve Queries</Link></li>
      </ul>
    </div>
  );
};

export default MentorDashboard;
