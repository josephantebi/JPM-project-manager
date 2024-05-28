import React, { useState, useEffect } from "react";
import "../style.css";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import priorityData from "../data/PriorityData";

function FullProject({ project, users }) {
  const {
    project_name,
    project_details,
    created_at,
    due_date,
    percent,
    posted_by,
  } = project;
  const [chartWidth, setChartWidth] = useState(
    window.innerWidth < 730 ? window.innerWidth - 20 : 730
  );
  const roles = project.roles.allRoles;
  const sub_projects = project.sub_projects.allSubProjects;

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 730 ? window.innerWidth - 20 : 730);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // date
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const date_created_at = formatDate(created_at);

  function findRolesByNames(names) {
    const lowerCaseNames = names.map((name) => name.toLowerCase());
    return users.filter((user) =>
      lowerCaseNames.includes(user.nickname.toLowerCase())
    );
  }
  const matchedRoles = findRolesByNames(roles);

  function getColorByPriority(priorityName) {
    const priority = priorityData.find((p) => p.priority === priorityName);
    return priority ? priority.color : "rgb(255, 255, 255)";
  }

  const roleCount = sub_projects
    .flatMap((subProject) => subProject.subProjectRoles)
    .reduce((acc, roleName) => {
      acc[roleName] = (acc[roleName] || 0) + 1;
      return acc;
    }, {});

  function addColorToRoles(roles, users) {
    const rolesArray = Object.entries(roles).map(([role, counter]) => ({
      name: role,
      counter,
    }));

    const enhancedRolesArray = rolesArray.map((roleObj) => {
      const user = users.find(
        (user) => user.nickname.toUpperCase() === roleObj.name.toUpperCase()
      );
      return {
        ...roleObj,
        color: user ? user.color : "#ccc",
      };
    });

    return enhancedRolesArray;
  }
  const augmentedRoles = addColorToRoles(roleCount, users);

  const roleCountArray = Object.entries(roleCount).map(([role, counter]) => {
    const normalizedRole = role;
    const user = users.find((r) => r.first_name === normalizedRole);
    return {
      role,
      counter,
    };
  });

  function getUserById(userNickname) {
    const user = users.find(
      (user) => user.nickname.toLowerCase() === userNickname.toLowerCase()
    );
    return user ? user : null;
  }

  const postedByDetails = getUserById(posted_by);
  const postByNickname = postedByDetails.nickname;

  return (
    <div className="project full-project">
      <span className="span-full-project">
        <div className="merriweather-font created-by">
          Project created by: {postByNickname}
        </div>
        <span className="merriweather-font">Priority:</span>
        <span
          style={{
            color: getColorByPriority(project.priority),
            fontWeight: "bolder",
            marginLeft: "5px",
          }}
        >
          {project.priority}
        </span>
        <div className="merriweather-font" style={{ marginTop: "10px" }}>
          Project's name:
        </div>
        <div className="project-name">{project_name}</div>
        <div className="merriweather-font">Project details:</div>
        <div className="project-details">{project_details}</div>
        <div className="merriweather-font">Sub-projects:</div>
        <div className="merriweather-font sub-project-details">
          <div>Sub-project name</div>
          <div
            className="roles-and-completion-details"
            style={{ marginRight: "10px" }}
          >
            <div>Roles</div>
            <div>Percent</div>
          </div>
        </div>
        <div className="project-subprojects">
          {sub_projects.map((subProject, index) => (
            <div key={index} className="sub-project-grid">
              <div className="sub-project-name">
                {`${index + 1}. ${subProject.subProjectName}`}
              </div>
              <div className="roles-and-completion">
                <div className="sub-project-roles">
                  {subProject.subProjectRoles.map((roleName, index) => {
                    const normalizedRoleName = roleName.toUpperCase();
                    const role = users.find(
                      (r) => r.nickname.toUpperCase() === normalizedRoleName
                    );
                    return (
                      <React.Fragment key={index}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: role ? role.color : "inherit",
                          }}
                        >
                          {roleName}
                        </span>
                        {index < subProject.subProjectRoles.length - 1 && (
                          <span style={{ color: "#FFFFFF" }}>, </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div className="sub-project-roles">
                  {subProject.subProjectPercent}%
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="project-data merriweather-font">
          <span
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <span>Creation date:</span>
            <span>{date_created_at}</span>
          </span>
          <span
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <span>Due Date:</span>
            <span>{due_date ? formatDate(due_date) : "N/A"}</span>
          </span>
          <span>Percent: {percent + "%"}</span>
        </div>
      </span>
      <div
        style={{
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            fontSize: "25px",
            textAlign: "center",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          Roles:
        </div>
        <div className="in-project-role-div merriweather-font">
          <ul>
            {augmentedRoles.map((cat, index) => (
              <li key={`role-${index}`}>
                <div
                  className="in-project-role"
                  style={{ backgroundColor: cat.color || "#ccc" }}
                >
                  {cat.name.toUpperCase()}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <>
          {
            <PieChart width={190} height={250} className="responsive-pie">
              <Pie
                data={roleCountArray}
                nameKey="role"
                dataKey="counter"
                innerRadius={60}
                outerRadius={95}
              >
                {augmentedRoles.map((entry, index) => (
                  <Cell
                    fill={entry.color}
                    stroke={entry.color}
                    key={`${entry.role}-${index}`}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          }
        </>
      </div>
    </div>
  );
}

export default FullProject;
