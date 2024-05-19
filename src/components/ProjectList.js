import React, { useState, useEffect } from "react";
import "../style.css";
import Project from "./Project";

function ProjectList({ projects, users, isLoadingUsers, isLoadingProjects }) {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(6);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 150) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLoadMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  if (projects.length === 0)
    return (
      <p className="message">
        No projects for this role yet! Create your first one 😉
      </p>
    );

  return (
    <section>
      <p className="number-of-projects merriweather-font">
        There are {projects.length} projects to do!
      </p>
      <ul className="projects-list">
        {projects.slice(0, visibleProjects).map((project) => (
          <Project
            project={project}
            key={project.id}
            users={users}
            isLoadingUsers={isLoadingUsers}
          />
        ))}
      </ul>
      {visibleProjects < projects.length && (
        <button className="load-more" onClick={handleLoadMore}>
          Load more projects
        </button>
      )}
      <span
        className={`material-symbols-outlined back-to-top ${
          showTopBtn ? "show" : ""
        }`}
        onClick={scrollToTop}
      >
        arrow_circle_up
      </span>
    </section>
  );
}

export default ProjectList;
