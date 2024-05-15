import React, { useState } from "react";
import "../style.css";

function RoleFilter({
  currentRole,
  setCurrentRole,
  projects,
  setFilteredProjects,
  users,
}) {
  const [showRoles, setShowRoles] = useState(false);

  const handleRoleClick = (roleName) => {
    const lowerRoleName = roleName.toLowerCase();
    setCurrentRole(roleName);

    if (roleName === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        project.roles.allRoles.some(
          (role) => role.toLowerCase() === lowerRoleName
        )
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <>
      <aside>
        <ul>
          <li className="style">
            <button
              className="btn btn-users"
              onClick={() => setShowRoles(!showRoles)}
            >
              {showRoles ? "Hide Users" : "Filter by User Name"}
            </button>
          </li>
          {showRoles && (
            <>
              <li className="role">
                <button
                  className={`btn btn-all-role ${
                    currentRole === "All" ? "selected" : ""
                  }`}
                  onClick={() => handleRoleClick("All")}
                >
                  All
                </button>
              </li>
              {users.map((role) => (
                <li key={role.id} className="role">
                  <button
                    className={`btn btn-category ${
                      currentRole === role.nickname ? "selected" : ""
                    }`}
                    style={{ backgroundColor: role.color }}
                    onClick={() => handleRoleClick(role.nickname)}
                  >
                    {role.nickname}
                  </button>
                </li>
              ))}
            </>
          )}
        </ul>
      </aside>
    </>
  );
}

export default RoleFilter;
