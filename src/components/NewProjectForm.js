import React, { useState, useContext } from "react";
import "../style.css";
// import { ProjectManagerContext } from "../Providers/Project-Manager-Provider";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../services/apiProjects";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function NewProjectForm({ setShowForm, usersData }) {
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const projectNameLength = projectName.length;
  const projectDetailsLength = projectDetails.length;
  const [selectsRole, setSelectsRole] = useState([{ id: 0, value: "" }]);
  const [inputs, setInputs] = useState([{ name: "", roles: [""] }]);
  const [dueDate, setDueDate] = useState("");
  // const { addProject } = useContext(ProjectManagerContext);
  const queryClient = useQueryClient();

  const handleAddInput = () => {
    setInputs(inputs.concat([{ name: "", roles: [""] }]));
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.slice();
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleAddRoleToSubProject = (index) => {
    const newInputs = [...inputs];
    newInputs[index].roles.push("");
    setInputs(newInputs);
  };

  const handleRemoveRoleFromSubProject = (index, roleIndex) => {
    const newInputs = [...inputs];
    newInputs[index].roles.splice(roleIndex, 1);
    setInputs(newInputs);
  };

  const handleRoleChange = (subProjectIndex, roleIndex, newValue) => {
    const newInputs = [...inputs];
    newInputs[subProjectIndex].roles[roleIndex] = newValue;
    setInputs(newInputs);
  };

  const handleSubProjectNameChange = (event, index) => {
    const newInputs = [...inputs];
    newInputs[index].name = event.target.value;
    setInputs(newInputs);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project successfully created", { duration: 3000 });
    },
    onError: (error) => {
      toast.error("Error deleting project");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      projectName &&
      projectDetails &&
      selectsRole &&
      projectNameLength <= 50 &&
      projectDetailsLength <= 800 &&
      dueDate
    ) {
      const now = new Date();
      const newProjectName =
        projectName.charAt(0).toUpperCase() + projectName.slice(1);
      const newProjectDetails =
        projectDetails.charAt(0).toUpperCase() + projectDetails.slice(1);
      const createdIn = now.toLocaleDateString();
      const allInputs = inputs.map((input, index) => ({
        id: index + 1,
        subProjectName: input.name,
        subProjectRoles: input.roles
          .filter((role) => role !== "")
          .map((role) => role.toUpperCase()),
        subProjectPercent: "0",
      }));

      const allRoles = Array.from(
        new Set(
          allInputs.flatMap(
            (subProject) =>
              subProject.subProjectRoles.map((role) => role.toUpperCase()) // Convert each role to uppercase
          )
        )
      );

      function convertDateToISO(dateString) {
        const parts = dateString.split(".");
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);
        date.setHours(12, 0, 0, 0);

        return date.toISOString();
      }
      const newProject = {
        project_name: newProjectName,
        project_details: newProjectDetails,
        sub_projects: {
          allSubProjects: allInputs,
        },
        roles: {
          allRoles: allRoles,
        },
        created_at: convertDateToISO(createdIn),
        due_date: dueDate,
        percent: 0,
        posted_by: 1,
      };

      mutate(newProject);
      setShowForm(false);
    }
  };

  return (
    <form className="project-form merriweather-font" onSubmit={handleSubmit}>
      <div className="project-form-div">
        <div className="new-project-text ">Project name:</div>
        <input
          className="project-form-text"
          type="text"
          id="projectName"
          placeholder="Enter a project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div className="project-form-div">
        <span className="form-var">{50 - projectNameLength}</span>
      </div>
      <div className="project-form-div">
        <div className="new-project-text">Project details:</div>
        <input
          className="project-form-text"
          type="text"
          id="projectDetails"
          placeholder="Enter the project details"
          value={projectDetails}
          onChange={(e) => setProjectDetails(e.target.value)}
        />
      </div>
      <div className="project-form-div">
        <span className="form-var">{800 - projectDetailsLength}</span>
      </div>
      <div className="project-form-div">
        <div className="new-project-text">Sub-projects:</div>
      </div>
      {inputs.map((input, index) => (
        <div key={index} className="subproject-group">
          <input
            type="text"
            className="project-form-text"
            placeholder="Sub-project name"
            value={input.name}
            onChange={(event) => handleSubProjectNameChange(event, index)}
          />
          <div className="roles-selection-container">
            {input.roles.map((role, roleIndex) => (
              <div key={roleIndex} className="role-selection">
                <select
                  className="project-form-role"
                  value={role}
                  onChange={(e) =>
                    handleRoleChange(index, roleIndex, e.target.value)
                  }
                >
                  <option value="">Choose Role</option>
                  {usersData.map((cat) => (
                    <option key={cat.id} value={cat.first_name}>
                      {cat.first_name.toUpperCase()}
                    </option>
                  ))}
                </select>
                {input.roles.length > 1 && (
                  <button
                    className="role-btn remove-role-btn"
                    type="button"
                    onClick={() =>
                      handleRemoveRoleFromSubProject(index, roleIndex)
                    }
                  >
                    Remove Role
                  </button>
                )}
              </div>
            ))}
            <button
              className="role-btn add-role-btn"
              type="button"
              onClick={() => handleAddRoleToSubProject(index)}
            >
              Add Role
            </button>
          </div>
          {inputs.length > 1 && (
            <button
              className="role-btn remove-subproject-btn"
              type="button"
              onClick={() => handleRemoveInput(index)}
            >
              Remove Subproject
            </button>
          )}
        </div>
      ))}
      <button
        className="role-btn add-subproject-btn"
        type="button"
        onClick={handleAddInput}
      >
        Add New Subproject
      </button>

      <div
        className="form-var"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        {new Date().toLocaleDateString()}
      </div>
      <div
        className="form-var"
        style={{ marginTop: "25px", marginBottom: "20px" }}
      >
        <span style={{ marginRight: "25px", marginBottom: "200px" }}>
          Due Date:
        </span>
        <input
          type="date"
          className=""
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="project-form-div">
        <button className="project-form-text add-btn btn">Add</button>
      </div>
    </form>
  );
}
export default NewProjectForm;
