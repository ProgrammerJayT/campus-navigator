import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //
  const [logged, setLogged] = useState(false);
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useState({
    id: "",
    type: "",
    name: "",
    surname: "",
    email: "",
  });

  //
  const providerChildren = {
    user,
    logged,
    checked,
    setUser,
    setLogged,
    setChecked,
  };

  useEffect(() => {
    //
    console.log("User changed", user);
  }, [user]);

  //
  return (
    <AuthContext.Provider value={providerChildren}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
