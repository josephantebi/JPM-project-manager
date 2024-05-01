import React from "react";
import "../style.css";
import ProjectCard from "./ProjectCard";

function Project({ project }) {
  return (
    <li className="project">
      <ProjectCard project={project} />
    </li>
  );
}

export default Project;
