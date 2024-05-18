import React, { createContext, useContext, useState } from "react";

const DataContext = createContext(null);

export function useDataProvider() {
  return useContext(DataContext);
}

export const UserDataProvider = ({ children }) => {
  const [usersDataProvider, setUsersDataProvider] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  return (
    <DataContext.Provider
      value={{
        usersDataProvider,
        setUsersDataProvider,
        projectsData,
        setProjectsData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
