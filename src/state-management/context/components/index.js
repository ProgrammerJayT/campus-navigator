import React, { createContext, useState } from "react";

const ComponentsStateContext = createContext();

export const ComponentsStateProvider = ({ children }) => {
  const [lottieLoadingComponent, setLottieLoadingComponent] = useState({
    visible: false,
  });

  const providerChildren = {
    lottieLoadingComponent,
    setLottieLoadingComponent,
  };

  return (
    <ComponentsStateContext.Provider value={providerChildren}>
      {children}
    </ComponentsStateContext.Provider>
  );
};

export default ComponentsStateContext;
