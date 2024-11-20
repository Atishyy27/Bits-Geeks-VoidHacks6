// src/hooks/useLocation.js
import { useState, useEffect } from 'react';

// Custom hook to get the user's location
const useLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
            });
          },
          (error) => {
            setLocation({
              latitude: null,
              longitude: null,
              error: error.message,
            });
          }
        );
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          error: 'Geolocation is not supported by this browser.',
        });
      }
    };

    getLocation(); // Call the function when the component mounts

    // Optionally, you can update location periodically or when needed
  }, []);

  return location;
};

export default useLocation;
