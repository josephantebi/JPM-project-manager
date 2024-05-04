import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function useLogInUser() {
  return useContext(UserContext);
}

export const LogInUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  const value = {
    currentUser,
    setCurrentUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
