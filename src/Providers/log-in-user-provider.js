import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

// Function to check if the currentUser object is empty
function isEmpty(obj) {
  return JSON.stringify(obj) === "{}";
}

export function useLogInUser() {
  return useContext(UserContext);
}

export const LogInUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const connected = !isEmpty(currentUser);

  const value = {
    currentUser,
    setCurrentUser,
    connected,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
