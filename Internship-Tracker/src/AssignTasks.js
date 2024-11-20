import React, { useState } from 'react';

const AssignTasks = () => {
  const [task, setTask] = useState('');
  const [internId, setInternId] = useState('');

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // API call to assign tasks
  };

  return (
    <div>
      <h3>Assign Tasks</h3>
      <form onSubmit={handleTaskSubmit}>
        <select onChange={(e) => setInternId(e.target.value)}>
          <option>Select Intern</option>
          {/* Interns will be fetched dynamically */}
        </select>
        <textarea
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Assign Task</button>
      </form>
    </div>
  );
};

export default AssignTasks;
