import PageNav from "../components/Header";
import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import EditProject from "../components/EditProjectComp";
import { useQueryClient } from "@tanstack/react-query";
import { editProject } from "../services/apiProjects";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function EditProjectpage() {
  const navigate = useNavigate();
  // const { updateProject } = useContext(ProjectManagerContext);
  // const { users } = useContext(UserContext);
  const { id: paramsID } = useParams();
  const location = useLocation();
  const queryClient = useQueryClient();
  const project = location.state?.project;
  const users = location.state?.users;
  const foundProject = project;
  const projectsRoles = foundProject.roles.allRoles;
  const sub_projects = foundProject.sub_projects.allSubProjects;
  // const [projectReturn, setProjectReturn] = useState(foundProject);
  const [projectName, setProjectName] = useState(foundProject.project_name);
  const [projectDetails, setProjectDetails] = useState(
    foundProject.project_details
  );
  const [tempSubProjects, setTempSubProjects] = useState([...sub_projects]);
  const [dueDate, setDueDate] = useState("");
  let projectReturn = foundProject;
  const findRolesByNames = (names) => {
    return users.filter((role) =>
      names.includes(role.first_name.toUpperCase())
    );
  };

  const matchedRoles = findRolesByNames(projectsRoles);
  const newProjectName =
    projectName.charAt(0).toUpperCase() + projectName.slice(1);
  const newProjectDetails =
    projectDetails.charAt(0).toUpperCase() + projectDetails.slice(1);
  const allRoles = Array.from(
    new Set(
      tempSubProjects
        .flatMap((subProject) => subProject.subProjectRoles)
        .map((role) => role.toUpperCase())
    )
  );

  const totalPercent = tempSubProjects.reduce(
    (acc, cur) => acc + Number(cur.subProjectPercent),
    0
  );
  // const averagePercent = (totalPercent / tempSubProjects.length).toFixed();
  const averagePercent = Math.round(totalPercent / tempSubProjects.length);

  const editedProject = {
    project_name: newProjectName,
    project_details: newProjectDetails,
    sub_projects: {
      allSubProjects: tempSubProjects,
    },
    roles: {
      allRoles: allRoles,
    },
    created_at: foundProject.created_at,
    due_date: dueDate,
    percent: averagePercent,
    posted_by: foundProject.posted_by,
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ editedProject, id }) => editProject(editedProject, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project successfully edited", { duration: 3000 });
    },
    onError: (error) => {
      toast.error("Error editing project");
    },
  });

  const handleExitClick = () => {
    navigate(`/projects/${paramsID}`, {
      state: { project: projectReturn, users: users },
    });
  };
  const saveChanges = async () => {
    mutate({ editedProject, id: paramsID });
    projectReturn = editedProject;
    handleExitClick();
  };

  return (
    <>
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
          onClick={handleExitClick}
        >
          X
        </button>
        <span
          style={{
            display: "flex",
            gap: "60px",
          }}
        >
          <span
            className="material-symbols-outlined material-symbols-outlined-delete-edit"
            style={{ cursor: "pointer", backgroundColor: "rgb(9, 9, 94)" }}
            onClick={saveChanges}
          >
            Done
          </span>
        </span>
      </span>
      <form className="">
        <EditProject
          foundProject={foundProject}
          matchedRoles={matchedRoles}
          projectName={projectName}
          setProjectName={setProjectName}
          projectDetails={projectDetails}
          setProjectDetails={setProjectDetails}
          tempSubProjects={tempSubProjects}
          setTempSubProjects={setTempSubProjects}
          dueDate={dueDate}
          setDueDate={setDueDate}
        />
      </form>
    </>
  );
}

export default EditProjectpage;
