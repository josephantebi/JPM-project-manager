import React, { useEffect, useState } from "react";
import { useLogInUser } from "../Providers/log-in-user-provider";
import PageNav from "../components/Header";
import Footer from "../components/Footer";
import AllProjectsPage from "../pages/AllProjectsPage";
import LogInPage from "./logInPage";
import FirstLogin from "./FirstLoginPage";
import Spinner from "../components/Spinner";
import Login from "../components/Login";

function Homepage() {
  const { currentUser } = useLogInUser();
  const [isLoading, setIsLoading] = useState(true);
  // Function to check if the currentUser object is empty
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }

  // Determine if a user is connected
  const connected = !isEmpty(currentUser);

  useEffect(() => {
    async function checkUser() {
      if (currentUser && currentUser.email) {
        // Simulate fetching extra user details like color and organization
        // This could be an API call to fetch more details based on currentUser
        setTimeout(() => {
          // Simulating fetch delay
          setIsLoading(false); // Assume data is loaded here
        }, 1000);
      } else {
        setIsLoading(false);
      }
    }
    checkUser();
  }, [currentUser]);

  return (
    <>
      <PageNav />
      {connected ? <Login /> : <LogInPage />}
      <Footer />
    </>
  );
}

export default Homepage;
