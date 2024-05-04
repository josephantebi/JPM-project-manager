import React, { useState, useContext, useEffect } from "react";
import "../style.css";
// import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import ProjectList from "../components/ProjectList";
import PageNav from "../components/Header";
import NewProjectForm from "../components/NewProjectForm";
import Footer from "../components/Footer";
import RoleFilter from "../components/RoleFilter";
import { useLogInUser } from "../Providers/log-in-user-provider";
import AddNewProject from "../components/AddNewProject";
import { getProjects } from "../services/apiProjects";
import { getUsers } from "../services/apiUsers";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

function Homepage() {
  const [showForm, setShowForm] = useState(false);
  const [setProjectsData] = useState();
  const [setUsersData] = useState();
  const [currentRole, setCurrentRole] = useState("All");
  // const [filteredProjects, setFilteredProjects] = useState(projects);
  const { currentUser } = useLogInUser();
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const connected = !isEmpty(currentUser);

  //supabase
  const {
    isLoading,
    data: projectsData,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const {
    isLoading: isLoadingUsers,
    data: usersData,
    error: errorUsers,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUsers,
  });
  if (isLoading) return <Spinner />;
  //supabase end

  return (
    <>
      <PageNav />
      {connected && (
        <AddNewProject showForm={showForm} setShowForm={setShowForm} />
      )}
      {showForm && (
        <NewProjectForm setShowForm={setShowForm} usersData={usersData} />
      )}
      <div className="sort-list-div">
        <input
          placeholder="Filter by Project Name / Details"
          className="filter-by-name"
        />
      </div>
      <main className="main">
        <RoleFilter
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          projects={projectsData}
          // setFilteredProjects={setFilteredProjects}
          users={usersData}
          isLoadingUsers={isLoadingUsers}
        />
        {/* <ProjectList projects={filteredProjects} /> */}
        <ProjectList
          projects={projectsData}
          users={usersData}
          isLoadingUsers={isLoadingUsers}
        />
        <Footer />
      </main>
    </>
  );
}

export default Homepage;
