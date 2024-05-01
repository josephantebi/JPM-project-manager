import React, { useState, useContext, useEffect } from "react";
import "../style.css";
import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import ProjectList from "../components/ProjectList";
import PageNav from "../components/Header";
import NewProjectForm from "../components/NewProjectForm";
import Footer from "../components/Footer";
import RoleFilter from "../components/RoleFilter";
import { useLogInUser } from "../Providers/log-in-user-provider";
import AddNewProject from "../components/AddNewProject";

function Homepage() {
  const [showForm, setShowForm] = useState(false);
  const [currentRole, setCurrentRole] = useState("All");
  const { projects, setQuery } = useContext(ProjectManagerContext);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const { currentUser } = useLogInUser();
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const connected = !isEmpty(currentUser);

  const handle_query = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  return (
    <>
      <PageNav />
      {connected && (
        <AddNewProject showForm={showForm} setShowForm={setShowForm} />
      )}
      {showForm && <NewProjectForm setShowForm={setShowForm} />}
      <div className="sort-list-div">
        <input
          placeholder="Filter by Project Name / Details"
          className="filter-by-name"
          onInput={handle_query}
        />
      </div>
      <main className="main">
        <RoleFilter
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          projects={projects}
          setFilteredProjects={setFilteredProjects}
        />
        <ProjectList projects={filteredProjects} />
        <Footer />
      </main>
    </>
  );
}

export default Homepage;
