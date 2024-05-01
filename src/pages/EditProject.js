import PageNav from "../components/Header";
import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import { UserContext } from "../Providers/User-Provider";
import EditProject from "../components/EditProjectComp";

function EditProjectpage() {
  const navigate = useNavigate();
  const { updateProject } = useContext(ProjectManagerContext);
  // const { users } = useContext(UserContext);
  const { id: paramsID } = useParams();
  const location = useLocation();
  const project = location.state?.project;
  const users = location.state?.users;
  const foundProject = project;
  const projectsRoles = foundProject.roles.allRoles;
  const sub_projects = foundProject.sub_projects.allSubProjects;

  const [projectName, setProjectName] = useState(foundProject.project_name);
  const [projectDetails, setProjectDetails] = useState(
    foundProject.project_details
  );
  const [tempSubProjects, setTempSubProjects] = useState([...sub_projects]);
  const [dueDate, setDueDate] = useState("");

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
    new Set(tempSubProjects.flatMap((subProject) => subProject.subProjectRoles))
  );

  const totalPercent = tempSubProjects.reduce(
    (acc, cur) => acc + Number(cur.subProjectPercent),
    0
  );
  const averagePercent = (totalPercent / tempSubProjects.length).toFixed();

  const editedProject = {
    project_name: newProjectName,
    project_details: newProjectDetails,
    sub_projects: tempSubProjects,
    roles: allRoles,
    created_at: foundProject.created_at,
    due_date: dueDate,
    percent: averagePercent,
    posted_by: foundProject.posted_by,
  };

  const handleExitClick = () => {
    navigate(`/projects/${paramsID}`, {
      state: { project: editedProject, users: users },
    });
  };
  const saveChanges = async () => {
    await updateProject(editedProject, project.id);
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
            className="material-symbols-outlined"
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
