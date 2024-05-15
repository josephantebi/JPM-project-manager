import React, { useState } from "react";
import "../style.css";
import { Button } from "@mui/material";

function UserCard({ user }) {
  const [isTextVisible, setIsTextVisible] = useState(false);

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  const permissions = user.admin ? "Admin" : "No permission";
  return (
    <>
      <span className="centered-user-card-div">
        <span>
          <p className="project-in-name">{user.nickname}</p>
        </span>
        {isTextVisible ? (
          <div>
            <span>
              <p className="project-in-name">Nickname: {user.nickname}</p>
            </span>
            <span>
              <p className="project-in-name">First name: {user.first_name}</p>
            </span>
            <span>
              <p className="project-in-name">Surname: {user.surname}</p>
            </span>

            <span>
              <p className="project-in-name">Email: {user.email}</p>
            </span>
            <span>
              <p className="project-in-name">Permission: {permissions}</p>
            </span>
            <span
              className="material-symbols-outlined expand expand-user-card"
              onClick={toggleTextVisibility}
              style={{ textAlign: "center" }}
            >
              expand_less
            </span>
          </div>
        ) : (
          <span
            className="material-symbols-outlined expand"
            onClick={toggleTextVisibility}
          >
            expand_more
          </span>
        )}
        <button>Edit user</button>
      </span>
    </>
  );
}

export default UserCard;
