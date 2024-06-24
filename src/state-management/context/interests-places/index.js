import React, { createContext, useState } from "react";

const InterestsPlacesContext = createContext();

export const InterestsPlacesProvider = ({ children }) => {
  const [interestsPlaces, setInterestsPlaces] = useState([]);
  const [fetchingInterestsPlacesContext, setFetchingInterestsPlacesContext] =
    useState(false);

  const providerChildren = {
    interestsPlaces,
    fetchingInterestsPlacesContext,
    setInterestsPlaces,
    setFetchingInterestsPlacesContext,
  };

  return (
    <InterestsPlacesContext.Provider value={providerChildren}>
      {children}
    </InterestsPlacesContext.Provider>
  );
};

export default InterestsPlacesContext;
