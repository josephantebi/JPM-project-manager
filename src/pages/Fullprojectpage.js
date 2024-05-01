import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../style.css";
import PageNav from "../components/Header";
import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import FullProject from "../components/FullProject";
import { useLogInUser } from "../Providers/log-in-user-provider";

function Fullprojectpage() {
  const { removeProject } = useContext(ProjectManagerContext);
  const location = useLocation();
  const { currentUser } = useLogInUser();
  function isEmpty(obj) {
    return JSON.stringify(obj) === "{}";
  }
  const connected = !isEmpty(currentUser);

  const project = location.state?.project;
  const users = location.state?.users;

  const navigate = useNavigate();
  const { id } = useParams();

  // Go to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deleteButton = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (isConfirmed) {
      removeProject(id);
      navigate("/");
    }
  };
  const handleEditClick = () => {
    navigate(`/projects/${id}/edit`, {
      state: { project: project, users: users },
    });
  };

  return (
    <main>
      <PageNav />
      <span
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginLeft: "5px",
          marginRight: "5px",
          marginTop: "15px",
        }}
      >
        <button
          className="btn full-project-btn merriweather-font"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          X
        </button>
        {connected && (
          <span className="full-project-btn-span">
            <span
              className="material-symbols-outlined"
              style={{ cursor: "pointer", backgroundColor: "green" }}
              onClick={handleEditClick}
            >
              edit
            </span>
            <span
              className="material-symbols-outlined"
              style={{ cursor: "pointer" }}
              onClick={deleteButton}
            >
              delete
            </span>
          </span>
        )}
      </span>

      <FullProject project={project} users={users} />
    </main>
  );
}

export default Fullprojectpage;
