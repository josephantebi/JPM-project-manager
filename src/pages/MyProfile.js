import React, { useState } from "react";
import PageNav from "../components/Header";
import DeleteUser from "../components/DeleteUser";
import EditUser from "../components/EditUser";
import PersonalInformation from "../components/PersonalInformation";
import "../style.css";

function MyProfile() {
  const [currentView, setCurrentView] = useState("personalInformation");

  const handleShowPersonalInformation = () =>
    setCurrentView("personalInformation");
  const handleShowEditProfile = () => setCurrentView("editProfile");
  const handleShowDeleteUser = () => setCurrentView("deleteUser");

  return (
    <>
      <PageNav />
      <div className="my-profile">
        <div className="my-profile-buttons">
          <button onClick={handleShowPersonalInformation}>
            Personal Information
          </button>
          <button onClick={handleShowEditProfile}>Edit Profile</button>
          <button onClick={handleShowDeleteUser}>Delete User</button>
        </div>
        <div className="my-profile-view">
          {currentView === "personalInformation" && <PersonalInformation />}
          {currentView === "editProfile" && <EditUser />}
          {currentView === "deleteUser" && <DeleteUser />}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
