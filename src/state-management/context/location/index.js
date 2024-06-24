import React, { createContext, useState } from "react";
import GetUserLocation from "../../../utils/location";

const LocationStateContext = createContext();

export const LocationStateProvider = ({ children }) => {
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [locationLoading, setLocationLoading] = useState(false);

  const providerChildren = {
    location,
    locationLoading,
  };

  const handleLocationLoading = (loading) => {
    setLocationLoading(loading);
  };

  const handleLocation = (currentLocation) => {
    setLocation(currentLocation.coords);
  };

  return (
    <LocationStateContext.Provider value={providerChildren}>
      {children}

      <GetUserLocation
        setLoading={(loading) => handleLocationLoading(loading)}
        setLocation={(currentLocation) => {
          handleLocation(currentLocation);
        }}
      />
    </LocationStateContext.Provider>
  );
};

export default LocationStateContext;
