import React, { useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../style.css";

function ProjectCard({ project, users, isLoadingUsers }) {
  const { id, project_name, project_details, percent, created_at } = project;
  const roles = project.roles.allRoles;

  const [isTextVisible, setIsTextVisible] = useState(false);

  if (isLoadingUsers) return <Spinner />;

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

  const toggleTextVisibility = () => {
    setIsTextVisible(!isTextVisible);
  };

  return (
    <span className="project-in">
      <span>
        <p className="project-in-name">{project_name}</p>
        {isTextVisible ? (
          <>
            <div>
              <p className="expand-more-text">{project_details}</p>
              <span
                className="material-symbols-outlined expand"
                onClick={toggleTextVisibility}
              >
                expand_less
              </span>
            </div>
          </>
        ) : (
          <span
            className="material-symbols-outlined expand"
            onClick={toggleTextVisibility}
          >
            expand_more
          </span>
        )}
      </span>
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
      {/* <span class="material-symbols-outlined expand">expand_more</span>
      <span class="material-symbols-outlined">expand_less</span>
      <p>text:</p> */}
    </span>
  );
}

export default ProjectCard;
