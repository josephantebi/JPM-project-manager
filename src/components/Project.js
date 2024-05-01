import React from "react";
import "../style.css";
import ProjectCard from "./ProjectCard";

function Project({ project, users, isLoadingUsers }) {
  return (
    <li className="project">
      <ProjectCard
        project={project}
        users={users}
        isLoadingUsers={isLoadingUsers}
      />
    </li>
  );
}

export default Project;
