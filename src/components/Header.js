import { Link, useNavigate, useLocation } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import "../style.css";
import logo from "../data/jpm-logo.jpg";
import { useLogInUser } from "../Providers/log-in-user-provider";

function PageNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, connected } = useLogInUser();
  const handleLogout = () => {
    navigate("/");
    googleLogout();
    window.location.reload();
  };

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
            {connected && currentUser.admin && (
              <Link
                to="/adminPage"
                className={`firstRowLink ${
                  location.pathname === "/adminPage" ? "activeLink" : ""
                }`}
              >
                <span>Admin</span>
              </Link>
            )}
            {connected && (
              <Link
                to="/myProfile"
                className={`my-profile-btn ${
                  location.pathname === "/myProfile" ? "activeLink" : ""
                }`}
              >
                <span>My Profile</span>
              </Link>
            )}
            {connected && (
              <button
                onClick={handleLogout}
                className="my-profile-btn"
                style={{ backgroundColor: "black" }}
                onMouseOver={(e) => (e.target.style.color = "red")}
                onMouseOut={(e) => (e.target.style.color = "")}
              >
                Logout
              </button>
            )}
          </span>
        </header>
      </nav>
      {connected && currentUser.nickname && (
        <span className="welcome">Welcome: {currentUser.nickname}</span>
      )}
    </>
  );
}

export default PageNav;
