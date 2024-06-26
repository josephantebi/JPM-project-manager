import React from "react";
import "../style.css";
import UserCard from "./UserCard";

function User({ user }) {
  return (
    <li className="user-li">
      <UserCard user={user} key={user.id} />
    </li>
  );
}

export default User;
