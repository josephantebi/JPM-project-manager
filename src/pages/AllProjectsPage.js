import "../style.css";
import React, { useState, useContext, useEffect } from "react";
import ProjectList from "../components/ProjectList";
import NewProjectForm from "../components/NewProjectForm";
import RoleFilter from "../components/RoleFilter";
import { useLogInUser } from "../Providers/log-in-user-provider";
import AddNewProject from "../components/AddNewProject";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { getUsersByOrganization } from "../services/apiUsers";
import { getProjectsByOrganization } from "../services/apiProjects";

function AllProjectsPage({ connected }) {
  const [showForm, setShowForm] = useState(false);
  const [currentRole, setCurrentRole] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);

  //supabase
  // const {
  //   isLoading,
  //   data: projectsData,
  //   error,
  // } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: getProjects,
  // });

  // const {
  //   isLoading: isLoadingUsers,
  //   data: usersData,
  //   error: errorUsers,
  // } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: getUsers,
  // });
  // if (isLoading) return <Spinner />;

  const { currentUser } = useLogInUser();
  const organization = currentUser.organization;

  //supabase
  const {
    isLoading,
    data: projectsData,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => getProjectsByOrganization(organization),
  });

  const {
    isLoading: isLoadingUsers,
    data: usersData,
    error: errorUsers,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsersByOrganization(organization),
  });

  useEffect(() => {
    if (projectsData) {
      setFilteredProjects(projectsData); // Assuming projectsData is the data you want to set
    }
  }, [projectsData]);

  if (isLoading) return <Spinner />;
  if (isLoadingUsers) return <Spinner />;
  //supabase end

  return (
    <>
      <AddNewProject showForm={showForm} setShowForm={setShowForm} />
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
        {/* <ProjectList projects={filteredProjects} /> */}

        <RoleFilter
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          projects={projectsData}
          setFilteredProjects={setFilteredProjects}
          users={usersData}
          isLoadingUsers={isLoadingUsers}
        />

        <ProjectList
          projects={filteredProjects}
          users={usersData}
          isLoadingUsers={isLoadingUsers}
        />
      </main>
    </>
  );
}
export default AllProjectsPage;
