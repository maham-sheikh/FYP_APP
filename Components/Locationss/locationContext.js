// Components/LocationContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as LocationAPI from 'expo-location';

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      let { status } = await LocationAPI.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        return;
      }

      let currentLocation = await LocationAPI.getCurrentPositionAsync({
        accuracy: LocationAPI.Accuracy.Balanced,
        timeout: 10000
      });
      
      setLocation(currentLocation.coords);
    } catch (err) {
      console.error('Location error:', err);
      setError(err.message || 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <LocationContext.Provider 
      value={{ 
        location, 
        error, 
        isLoading, 
        getCurrentLocation,
        setLocation 
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
