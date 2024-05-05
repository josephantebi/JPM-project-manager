import { Link, useNavigate, useLocation } from "react-router-dom";
// import { ProjectManagerProvider } from "../Providers/Project-Manager-Provider";
import { useState } from "react";
import "../style.css";
import logo from "../data/jpm-logo.jpg";
import GoogleAuth from "../Providers/auth-provider";
import { useLogInUser } from "../Providers/log-in-user-provider";

function PageNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useLogInUser();
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const connected = !isEmpty(currentUser);
  let userName = "";
  if (connected) {
    userName = (
      currentUser.first_name +
      " " +
      currentUser.surname
    ).toUpperCase();
  }

  return (
    <>
      <nav>
        {/* <ProjectManagerProvider> */}
        <header className="header merriweather-font">
          <img
            src={logo}
            alt="Logo"
            width="100"
            height="100"
            onClick={() => navigate("/")}
            style={{
              cursor: "pointer",
              borderRadius: "20px",
              border: "2px solid white",
            }}
          ></img>
          <span className="firstRow">
            <Link
              to="/"
              className={`firstRowLink ${
                location.pathname === "/" ? "activeLink" : ""
              }`}
            >
              <span>Home</span>
            </Link>
            <Link
              to="/aboutJPM"
              className={`firstRowLink ${
                location.pathname === "/aboutJPM" ? "activeLink" : ""
              }`}
            >
              <span>About JPM</span>
            </Link>
            <Link
              to="/aboutMe"
              className={`firstRowLink ${
                location.pathname === "/aboutMe" ? "activeLink" : ""
              }`}
            >
              <span>About Me</span>
            </Link>
            <Link
              to="/JPMvision"
              className={`firstRowLink ${
                location.pathname === "/JPMvision" ? "activeLink" : ""
              }`}
            >
              <span>JPM Vision</span>
            </Link>
          </span>
        </header>
        {/* </ProjectManagerProvider> */}
      </nav>
      {connected && <span className="welcome">Welcome: {userName}</span>}
    </>
  );
}

export default PageNav;
