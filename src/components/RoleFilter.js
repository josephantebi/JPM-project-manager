import React, { useState, useEffect } from "react";
import "../style.css";

function RoleFilter({
  currentRole,
  setCurrentRole,
  projects,
  setFilteredProjects,
  users,
}) {
  const [showRoles, setShowRoles] = useState(false);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [selectedUser, setSelectedUser] = useState("All");

  useEffect(() => {
    const completed = [];
    const inProgress = [];
    projects.forEach((project) => {
      if (project.percent === 100) {
        completed.push(project);
      } else {
        inProgress.push(project);
      }
    });
    setCompletedProjects(completed);
    setProjectsInProgress(inProgress);

    // Set default to Projects in Progress
    setFilteredProjects(inProgress);
    setCurrentRole("ProjectsInProgress");
  }, [projects]);

  const handleRoleClick = (roleName) => {
    setCurrentRole(roleName);
    applyFilters(roleName, selectedUser);
  };

  const handleUserFilterChange = (nickname) => {
    setSelectedUser(nickname);
    applyFilters(currentRole, nickname);
  };

  const applyFilters = (projectStatus, userNickname) => {
    let filtered = projects;

    if (projectStatus === "CompletedProjects") {
      filtered = completedProjects;
    } else if (projectStatus === "ProjectsInProgress") {
      filtered = projectsInProgress;
    }

    if (userNickname !== "All") {
      filtered = filtered.filter((project) =>
        project.roles.allRoles.some(
          (role) => role.toLowerCase() === userNickname.toLowerCase()
        )
      );
    }

    setFilteredProjects(filtered);
  };

  // Reset role filter but maintain the current project status filter
  const resetRoleFilter = () => {
    setSelectedUser("All");
    applyFilters(currentRole, "All");
  };

  return (
    <>
      <aside style={{ marginTop: "20px" }}>
        <ul>
          <li className="role">
            <button
              className={`btn btn-all-role btn-category ${
                currentRole === "All" ? "selected" : ""
              }`}
              onClick={() => handleRoleClick("All")}
              style={{ color: "black", marginTop: "50px" }}
            >
              All Projects
            </button>
          </li>
          <li className="role">
            <button
              className={`btn btn-all-role btn-category ${
                currentRole === "ProjectsInProgress" ? "selected large-btn" : ""
              }`}
              onClick={() => handleRoleClick("ProjectsInProgress")}
              style={{ backgroundColor: "red" }}
            >
              Projects in Progress
            </button>
          </li>
          <li className="role">
            <button
              className={`btn btn-all-role btn-category ${
                currentRole === "CompletedProjects" ? "selected" : ""
              }`}
              onClick={() => handleRoleClick("CompletedProjects")}
              style={{
                color: "black",
                backgroundColor: "rgb(70, 255, 8)",
                marginBottom: "10px",
              }}
            >
              Completed Projects
            </button>
          </li>
          <li className="style">
            <button
              className="btn btn-users"
              onClick={() => setShowRoles(!showRoles)}
            >
              {showRoles ? "Hide filter by User Name" : "Filter by User Name"}
            </button>
          </li>
          {showRoles && (
            <>
              <li className="role">
                <button
                  className="btn btn-category"
                  onClick={resetRoleFilter}
                  style={{
                    marginBottom: "10px",
                    backgroundColor: "#640D6B",
                    fontSize: "medium",
                  }}
                >
                  All Roles
                </button>
              </li>
              {users.map((user) => (
                <li key={user.id} className="role">
                  <button
                    className={`btn btn-category ${
                      selectedUser === user.nickname ? "selected" : ""
                    }`}
                    style={{ backgroundColor: user.color }}
                    onClick={() => handleUserFilterChange(user.nickname)}
                  >
                    {user.nickname}
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
