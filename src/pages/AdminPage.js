import React, { useState } from "react";
import PageNav from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import { getUsersByOrganization } from "../services/apiUsers";
import AddNewUser from "../components/AddNewUser";
import Spinner from "../components/Spinner";
import UserList from "../components/UserList";
import "../style.css";

function AdminPage() {
  const { currentUser } = useLogInUser();
  const organization = currentUser.organization;
  const [currentView, setCurrentView] = useState(null); // No default view

  const {
    isLoading: isLoadingUsers,
    data: usersData,
    error: errorUsers,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsersByOrganization(organization),
  });

  if (isLoadingUsers) return <Spinner />;

  const sortedUsers = usersData?.sort((a, b) => {
    if (a.nickname === currentUser.nickname) return -1; // Current user goes first
    if (b.nickname === currentUser.nickname) return 1;
    if (a.admin && !b.admin) return -1; // Admins go next
    if (!a.admin && b.admin) return 1;
    return a.nickname.localeCompare(b.nickname); // Finally, sort alphabetically by nickname
  });

  const handleShowUsers = () => setCurrentView("users");
  const handleAddNewUser = () => setCurrentView("addUser");

  return (
    <>
      <PageNav />
      <button onClick={handleShowUsers}>Users</button>
      <button onClick={handleAddNewUser}>Add new user to organization</button>
      {currentView === "users" && <UserList usersData={sortedUsers} />}
      {currentView === "addUser" && <AddNewUser />}
    </>
  );
}

export default AdminPage;
