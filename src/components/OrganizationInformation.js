import React from "react";
import { useLogInUser } from "../Providers/log-in-user-provider";
import "../style.css";

function OrganizationInformation() {
  const { currentUser } = useLogInUser();

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
        <div>Organization Name: {currentUser.organization}</div>
      </div>
    </>
  );
}

export default OrganizationInformation;
