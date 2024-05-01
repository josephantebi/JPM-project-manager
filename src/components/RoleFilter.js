import React, { useContext, useEffect } from "react";
import Spinner from "../components/Spinner";
import "../style.css";

function RoleFilter({
  currentRole,
  setCurrentRole,
  projects,
  setFilteredProjects,
  users,
  isLoadingUsers,
}) {
  if (isLoadingUsers) return <Spinner />;

  const handleRoleClick = (roleName) => {
    setCurrentRole(roleName);

    if (roleName === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.roles.allRoles.includes(roleName)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <aside>
      <ul>
        <li className="style">
          <button
            className="btn btn-all-role"
            style={{ backgroundColor: "red" }}
            onClick={() => handleRoleClick("All")}
          >
            All
          </button>
        </li>
        {users.map((role) => (
          <li key={role.id} className="role">
            <button
              className={`btn btn-category ${
                currentRole === role.first_name ? "selected" : ""
              }`}
              style={{ backgroundColor: role.color }}
              onClick={() => handleRoleClick(role.first_name.toUpperCase())}
            >
              {role.first_name.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default RoleFilter;
