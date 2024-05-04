import React, { useContext } from "react";
import "../style.css";
import Project from "./Project";
// import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";

function ProjectList({ projects, users, isLoadingUsers }) {
  // const { toProject, setToProject } = useContext();
  if (projects.length === 0)
    return (
      <p className="message">
        No projects for this role yet! Create your first one 😉
      </p>
    );

  // צריך להוסיף
  const handle_to_project = () => {
    // setToProject(toProject + 5);
  };

  return (
    <section>
      <p className="number-of-projects merriweather-font">
        There are {projects.length} projects to do!
      </p>
      <ul className="projects-list">
        {projects.map((project) => (
          <Project
            project={project}
            key={project.id}
            users={users}
            isLoadingUsers={isLoadingUsers}
          />
        ))}
      </ul>
      <button className="load-more" onClick={handle_to_project}>
        Load more projects
      </button>
    </section>
  );
}

export default ProjectList;
