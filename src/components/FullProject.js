import React, { useContext } from "react";
import { UserContext } from "../private/hide/User-Provider";
import { PieChart, Tooltip } from "recharts";
import "../style.css";
import { Pie } from "recharts/lib/polar/Pie";
import { Cell } from "recharts/lib/component/Cell";

function FullProject({ project, users }) {
  const {
    project_name,
    project_details,
    created_at,
    due_date,
    percent,
    posted_by,
  } = project;
  const roles = project.roles.allRoles;
  const sub_projects = project.sub_projects.allSubProjects;

  // date
  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const date_created_at = formatDate(created_at);

  const findRolesByNames = (names) => {
    return users.filter((role) =>
      names.includes(role.first_name.toUpperCase())
    );
  };
  const matchedRoles = findRolesByNames(roles);

  const roleCount = sub_projects
    .flatMap((subProject) => subProject.subProjectRoles)
    .reduce((acc, roleName) => {
      acc[roleName] = (acc[roleName] || 0) + 1;
      return acc;
    }, {});

  function addColorToRoles(roles, users) {
    // Convert the roles object into an array of objects for processing
    const rolesArray = Object.entries(roles).map(([role, counter]) => ({
      name: role,
      counter,
    }));

    // Map through the array and add the color by finding the corresponding user
    const enhancedRolesArray = rolesArray.map((roleObj) => {
      const user = users.find(
        (user) => user.first_name.toUpperCase() === roleObj.name.toUpperCase()
      );
      return {
        ...roleObj,
        color: user ? user.color : "#ccc", // Default color if no match is found
      };
    });

    return enhancedRolesArray; // Return the array format directly
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

  function getUserById(id) {
    const user = users.find((user) => user.id === id);
    return user ? user : null;
  }

  const postedByDetails = getUserById(posted_by);

  // const fullName =
  //   postedByDetails.first_name.charAt(0).toUpperCase() +
  //   postedByDetails.first_name.slice(1).toLowerCase() +
  //   " " +
  //   postedByDetails.surname.charAt(0).toUpperCase() +
  //   postedByDetails.surname.slice(1).toLowerCase();

  const nickname = postedByDetails.nickname;

  return (
    <div className="project full-project">
      <span>
        <div className="merriweather-font created-by">
          Project created by: {nickname}
        </div>
        <div className="merriweather-font">Project's name:</div>
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
                      (r) => r.first_name.toUpperCase() === normalizedRoleName
                    );
                    return (
                      <React.Fragment key={index}>
                        <span
                          style={{
                            fontWeight: "bold",
                            color: role ? role.color : "inherit",
                          }}
                        >
                          {roleName + " " + role.surname[0].toUpperCase() + "."}
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
            {matchedRoles.map((cat) => (
              <li key={cat.id}>
                <div
                  className="in-project-role"
                  style={{ backgroundColor: cat.color || "#ccc" }}
                >
                  {cat.first_name.toUpperCase() +
                    " " +
                    cat.surname[0].toUpperCase() +
                    "."}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <>
          {
            <PieChart width={730} height={250}>
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
