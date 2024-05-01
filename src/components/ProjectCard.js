import React, { useContext } from "react";
import { UserContext } from "../Providers/User-Provider";
import { Link } from "react-router-dom";
import "../style.css";

function ProjectCard({ project }) {
  const { users } = useContext(UserContext);
  const { id, project_name, percent, created_at, roles } = project;

  const findRolesByNames = (names) => {
    return users.filter((role) =>
      names.includes(role.first_name.toUpperCase())
    );
  };

  const matchedRoles = findRolesByNames(roles);

  // date
  const date = new Date(created_at);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <span className="project-in">
      <p className="project-in-name">{project_name}</p>
      <div className="date-percentage">
        <div className="role-in-project">
          <ul>
            {matchedRoles.map((cat) => (
              <li key={cat.id}>
                <div
                  style={{
                    backgroundColor: cat.color,
                    color: cat.color,
                    height: "16px",
                    width: "25px",
                    fontFamily: "Roboto, sans-serif",
                  }}
                >
                  -
                </div>
              </li>
            ))}
          </ul>
        </div>
        <span>{percent + "%"}</span>
        <span>{formattedDate}</span>
      </div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <Link
          className="show-project-link show-project-button"
          to={`projects/${id}`}
          state={{ project: project, users: users }}
        >
          Show full project
        </Link>
      </span>
    </span>
  );
}

export default ProjectCard;
