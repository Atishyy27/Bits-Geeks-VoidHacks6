import React, { useState } from 'react';

const ReportEvaluation = () => {
  const [evaluation, setEvaluation] = useState('');
  const [internId, setInternId] = useState('');

  const handleEvaluate = (e) => {
    e.preventDefault();
    // API call to submit report evaluation
  };

  return (
    <div>
      <h3>Report Evaluation</h3>
      <form onSubmit={handleEvaluate}>
        <select onChange={(e) => setInternId(e.target.value)}>
          <option>Select Intern</option>
          {/* Interns will be fetched dynamically from API */}
        </select>
        <textarea
          placeholder="Enter evaluation feedback"
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
        />
        <button type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
};

export default ReportEvaluation;
