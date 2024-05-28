import React, { useState, useEffect } from "react";
import priorityData from "../data/PriorityData";
import "../style.css";

function ProjectFilter({
  currentRole,
  setCurrentRole,
  projects,
  setFilteredProjects,
  users,
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [projectsInProgress, setProjectsInProgress] = useState([]);
  const [selectedUser, setSelectedUser] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

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
    setFilteredProjects(inProgress);
    setCurrentRole("ProjectsInProgress");
  }, [projects]);

  const handleRoleClick = (roleName) => {
    setCurrentRole(roleName);
    applyFilters(roleName, selectedUser, selectedPriority);
  };

  const handleUserFilterChange = (nickname) => {
    if (nickname === selectedUser) {
      setSelectedUser("All");
      applyFilters(currentRole, "All", selectedPriority);
    } else {
      setSelectedUser(nickname);
      applyFilters(currentRole, nickname, selectedPriority);
    }
  };

  const handlePriorityFilterChange = (priority) => {
    if (priority === selectedPriority) {
      setSelectedPriority("All");
      applyFilters(currentRole, selectedUser, "All");
    } else {
      setSelectedPriority(priority);
      applyFilters(currentRole, selectedUser, priority);
    }
  };

  const applyFilters = (projectStatus, userNickname, priority) => {
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

    if (priority !== "All") {
      filtered = filtered.filter((project) => project.priority === priority);
    }

    setFilteredProjects(filtered);
  };

  const resetRoleFilter = () => {
    setSelectedUser("All");
    applyFilters(currentRole, "All", selectedPriority);
  };

  return (
    <>
      <aside style={{ marginTop: "20px" }}>
        <ul>
          <li className="style">
            <button
              className="btn btn-users"
              onClick={() => setShowFilter(!showFilter)}
            >
              {showFilter ? "Hide filter" : "Filter Projects"}
            </button>
          </li>
          {showFilter && (
            <>
              <li className="role">
                <button
                  className={`btn btn-all-role btn-category ${
                    currentRole === "All" ? "selected" : ""
                  }`}
                  onClick={() => handleRoleClick("All")}
                  style={{ color: "black" }}
                >
                  All Projects
                </button>
              </li>
              <li className="role">
                <button
                  className={`btn btn-all-role btn-category ${
                    currentRole === "ProjectsInProgress" ? "selected" : ""
                  }`}
                  onClick={() => handleRoleClick("ProjectsInProgress")}
                  style={{ backgroundColor: "#950000" }}
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
                  style={{ backgroundColor: "rgb(70, 255, 8)" }}
                >
                  Completed Projects
                </button>
              </li>
              <li
                className="role"
                style={{ marginTop: "20px", marginLeft: "8px" }}
              >
                By priority
              </li>
              {priorityData.map((priority) => (
                <li key={priority.id} className="role">
                  <button
                    className={`btn btn-category ${
                      selectedPriority === priority.priority ? "selected" : ""
                    }`}
                    style={{ backgroundColor: priority.color }}
                    onClick={() =>
                      handlePriorityFilterChange(priority.priority)
                    }
                  >
                    {priority.priority} Priority
                  </button>
                </li>
              ))}
              {/* <li className="role">
                <button
                  className="btn btn-category"
                  onClick={resetRoleFilter}
                  style={{
                    marginTop: "15px",
                    marginBottom: "8px",
                    backgroundColor: "#640D6B",
                    fontSize: "medium",
                  }}
                >
                  All Users
                </button>
              </li> */}
              <li
                className="role"
                style={{ marginTop: "20px", marginLeft: "8px" }}
              >
                By users
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

export default ProjectFilter;
