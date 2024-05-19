import React, { useState } from "react";
import PageNav from "../components/Header";
import { useDataProvider } from "../Providers/DataProvider";
import AddNewUser from "../components/AddNewUser";
import UserList from "../components/UserList";
import "../style.css";

function AdminPage() {
  const { usersDataProvider } = useDataProvider();
  const [currentView, setCurrentView] = useState(null);

  // const sortedUsers = usersDataProvider?.sort((a, b) => {
  //   // Move deleted users to the end
  //   if (a.deleted_user && !b.deleted_user) return 1;
  //   if (!a.deleted_user && b.deleted_user) return -1;
  //   // Prioritize the current user
  //   if (a.nickname === currentUser.nickname) return -1;
  //   if (b.nickname === currentUser.nickname) return 1;
  //   // Sort admins next
  //   if (a.admin && !b.admin) return -1;
  //   if (!a.admin && b.admin) return 1;
  //   // Finally, sort alphabetically by nickname
  //   return a.nickname.localeCompare(b.nickname);
  // });

  const handleShowUsers = () => setCurrentView("users");
  const handleAddNewUser = () => setCurrentView("addUser");

  return (
    <>
      <PageNav />
      <button onClick={handleShowUsers}>Users</button>
      <button onClick={handleAddNewUser}>Add new user to organization</button>
      {currentView === "users" && <UserList usersData={usersDataProvider} />}
      {currentView === "addUser" && <AddNewUser />}
    </>
  );
}

export default AdminPage;
