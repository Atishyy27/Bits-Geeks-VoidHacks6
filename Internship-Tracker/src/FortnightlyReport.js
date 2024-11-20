import React, { useState } from 'react';

const FortnightlyReport = () => {
  const [report, setReport] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to submit the report
  };

  return (
    <div>
      <h3>Fortnightly Report</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter report details"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter location coordinates"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FortnightlyReport;
