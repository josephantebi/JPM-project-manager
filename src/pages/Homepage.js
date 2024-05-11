import React, { useEffect, useState } from "react";
import { useLogInUser } from "../Providers/log-in-user-provider";
import PageNav from "../components/Header";
import Footer from "../components/Footer";
import AllProjectsPage from "../pages/AllProjectsPage";
import LogInPage from "./logInPage";
import FirstLogin from "./FirstLoginPage";
import Spinner from "../components/Spinner";
import Login from "../components/Login";
import "../style.css";

function Homepage() {
  const { currentUser, connected } = useLogInUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (currentUser && currentUser.email) {
        // Simulate fetching extra user details like color and organization
        setTimeout(() => {
          // Simulating fetch delay
          setIsLoading(false);
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
