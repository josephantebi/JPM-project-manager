import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../style.css";
import logo from "../data/jpm-logo.jpg";
import { useLogInUser } from "../Providers/log-in-user-provider";

function PageNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, connected } = useLogInUser();

  let userName = "";
  if (currentUser != null) {
    userName = (
      currentUser.first_name +
      " " +
      currentUser.surname
    ).toUpperCase();
  }

  return (
    <>
      <nav>
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
            {connected && (
              <Link
                to="/myProfile"
                className={`my-profile ${
                  location.pathname === "/myProfile" ? "activeLink" : ""
                }`}
              >
                <span>My Profile</span>
              </Link>
            )}
          </span>
        </header>
      </nav>
      {connected && (
        <span className="welcome">Welcome: {currentUser.nickname}</span>
      )}
    </>
  );
}

export default PageNav;
