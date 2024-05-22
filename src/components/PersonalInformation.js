import React from "react";
import { useLogInUser } from "../Providers/log-in-user-provider";
import "../style.css";

function PersonalInformation() {
  const { currentUser } = useLogInUser();
  const permissions = currentUser.admin ? "Admin" : "No permission";
  const deleteOrganizationPermission =
    currentUser.delete_organization_permission ? "True" : "False";

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const date_created_at = formatDate(currentUser.created_at);

  return (
    <>
      <div className="user-info-container">
        <div className="avatar-container">
          <img
            src={currentUser.avatar}
            alt="User Avatar"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div>Nickname: {currentUser.nickname}</div>
        <div>First Name: {currentUser.first_name}</div>
        <div>Surname: {currentUser.surname}</div>
        <div>Email: {currentUser.email}</div>
        <div>Organization: {currentUser.organization}</div>
        <div>Permissions: {permissions}</div>
        <div>
          Delete Organization Permission: {deleteOrganizationPermission}
        </div>
        <div>User Created At: {date_created_at}</div>
      </div>
    </>
  );
}

export default PersonalInformation;
