import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../style.css";
import PageNav from "../components/Header";
// import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import FullProject from "../components/FullProject";
import { useLogInUser } from "../Providers/log-in-user-provider";
import { useMutation } from "@tanstack/react-query";
import { deleteProject } from "../services/apiProjects";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

function Fullprojectpage() {
  const location = useLocation();
  const { currentUser } = useLogInUser();
  const queryClient = useQueryClient();

  const project = location.state?.project;
  const users = location.state?.users;

  const usersProject = project.roles.allRoles;
  const nickname = currentUser.nickname.toUpperCase();

  const navigate = useNavigate();
  const { id } = useParams();

  // Go to the top of the page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      if (isLoading) return <Spinner />;
      toast.success("Project deleted successfully", { duration: 3000 });
      navigate("/");
    },
    onError: (error) => {
      toast.error("Error deleting project");
    },
  });

  const deleteButton = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (isConfirmed) {
      mutate(id);
    }
  };
  const handleEditClick = () => {
    navigate(`/projects/${id}/edit`, {
      state: { project: project, users: users },
    });
  };

  const canEditAndDelete =
    usersProject
      .map((role) => role.toLowerCase())
      .includes(nickname.toLowerCase()) || currentUser.admin;

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
        {canEditAndDelete && (
          <span className="full-project-btn-span">
            <span
              className="material-symbols-outlined material-symbols-outlined-delete-edit"
              style={{ cursor: "pointer", backgroundColor: "green" }}
              onClick={handleEditClick}
            >
              edit
            </span>
            <span
              className="material-symbols-outlined material-symbols-outlined-delete-edit"
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
