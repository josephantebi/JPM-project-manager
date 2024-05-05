import React, { useState, useContext, useEffect } from "react";
import "../style.css";
// import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import PageNav from "../components/Header";
import Footer from "../components/Footer";
import { useLogInUser } from "../Providers/log-in-user-provider";
import AllProjectsPage from "../pages/AllProjectsPage";
import LogInPage from "../pages/logInPage";

function Homepage() {
  const { currentUser } = useLogInUser();
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const connected = !isEmpty(currentUser);

  return (
    <>
      <PageNav />
      {connected ? <AllProjectsPage connected={connected} /> : <LogInPage />}
      <Footer />
    </>
  );
}

export default Homepage;
