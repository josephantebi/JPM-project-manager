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

function AllProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentRole, setCurrentRole] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
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
      setFilteredProjects(projectsData);
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
        <input placeholder="Search" className="filter-by-name" />
      </div>
      <main className="main">
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
