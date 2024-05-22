import React, { useState } from "react";
import PageNav from "../components/Header";
import { useDataProvider } from "../Providers/DataProvider";
import AddNewUser from "../components/AddNewUser";
import UserList from "../components/UserList";
import OrganizationInformation from "../components/OrganizationInformation";
import "../style.css";

function AdminPage() {
  const { usersDataProvider } = useDataProvider();
  const [currentView, setCurrentView] = useState("organizationInformation");

  const handleShowOrganizationInformation = () =>
    setCurrentView("organizationInformation");
  const handleShowUsers = () => setCurrentView("users");
  const handleAddNewUser = () => setCurrentView("addUser");

  return (
    <>
      <PageNav />
      <div className="my-profile">
        <div className="my-profile-buttons">
          <button onClick={handleShowOrganizationInformation}>
            Organization Information
          </button>
          <button onClick={handleShowUsers}>Users</button>
          <button onClick={handleAddNewUser}>
            Add new user to organization
          </button>
        </div>
        <div className="my-profile-view">
          {currentView === "organizationInformation" && (
            <OrganizationInformation />
          )}
          {currentView === "users" && (
            <UserList usersData={usersDataProvider} />
          )}
          {currentView === "addUser" && <AddNewUser />}
        </div>
      </div>
    </>
  );
}

export default AdminPage;
