import React, { useState } from 'react';

const LiveLocation = () => {
  const [location, setLocation] = useState('');

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    // API call to submit live location
  };

  return (
    <div>
      <h3>Live Location</h3>
      <form onSubmit={handleLocationSubmit}>
        <input
          type="text"
          placeholder="Enter your location coordinates"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Submit Location</button>
      </form>
    </div>
  );
};

export default LiveLocation;
