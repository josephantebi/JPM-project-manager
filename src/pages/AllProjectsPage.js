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
import { useDataProvider } from "../Providers/DataProvider";
// import { DataContext } from "../Providers/data-provider";

function AllProjectsPage() {
  const [showForm, setShowForm] = useState(false);
  const [currentRole, setCurrentRole] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const { currentUser } = useLogInUser();
  const { setUsersDataProvider, setProjectsData } = useDataProvider();
  const organization = currentUser.organization;
  //supabase
  const {
    isLoading: isLoadingProjects,
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

  const sortedUsers = usersData?.sort((a, b) => {
    // Move deleted users to the end
    if (a.deleted_user && !b.deleted_user) return 1;
    if (!a.deleted_user && b.deleted_user) return -1;
    // Prioritize the current user
    if (a.nickname === currentUser.nickname) return -1;
    if (b.nickname === currentUser.nickname) return 1;
    // Sort admins next
    if (a.admin && !b.admin) return -1;
    if (!a.admin && b.admin) return 1;
    // Finally, sort alphabetically by nickname, ensuring nicknames are valid
    if (!a.nickname && b.nickname) return 1; // assuming `null` nicknames sort last
    if (a.nickname && !b.nickname) return -1;
    if (!a.nickname && !b.nickname) return 0; // handle both `null` equally
    return (a.nickname || "").localeCompare(b.nickname || "");
  });

  useEffect(() => {
    if (projectsData) {
      setProjectsData(projectsData);
    }
  }, [projectsData, setProjectsData]);

  useEffect(() => {
    if (usersData) {
      setUsersDataProvider(usersData);
    }
  }, [usersData, setUsersDataProvider]);

  if (isLoadingProjects || isLoadingUsers) return <Spinner />;
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
          users={sortedUsers}
          isLoadingUsers={isLoadingUsers}
        />

        <ProjectList
          projects={filteredProjects}
          users={usersData}
          isLoadingUsers={isLoadingUsers}
          isLoadingProjects={isLoadingProjects}
        />
      </main>
    </>
  );
}
export default AllProjectsPage;
