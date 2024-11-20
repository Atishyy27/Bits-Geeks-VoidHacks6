import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/manage-interns">Manage Interns</Link></li>
        <li><Link to="/manage-mentors">Manage Mentors</Link></li>
        <li><Link to="/query-resolver">Resolve Queries</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
