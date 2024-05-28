import React, { useState } from "react";
import "../style.css";
import { useMutation } from "@tanstack/react-query";
import { createProject } from "../services/apiProjects";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import MultipleSelect from "./MultipleSelect";
import PrioritySelect from "./SelectPriority";
import Spinner from "../components/Spinner";

function NewProjectForm({ setShowForm, usersData }) {
  const [projectName, setProjectName] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [priority, setPriority] = useState("");
  const [inputs, setInputs] = useState([{ name: "", selectedUsers: [] }]);
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();
  const { currentUser } = useLogInUser();

  const handleAddInput = () => {
    setInputs([...inputs, { name: "", selectedUsers: [] }]);
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.slice();
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleSubProjectNameChange = (event, index) => {
    const newInputs = [...inputs];
    newInputs[index].name = event.target.value;
    setInputs(newInputs);
    const newErrors = { ...errors };
    delete newErrors[`subprojectName-${index}`];
    setErrors(newErrors);
  };

  const handleSelectedUsersChange = (selectedUsers, index) => {
    const newInputs = [...inputs];
    newInputs[index].selectedUsers = selectedUsers;
    setInputs(newInputs);
    const newErrors = { ...errors };
    delete newErrors[`subprojectUsers-${index}`];
    setErrors(newErrors);
  };

  const handleChangeProjectName = (e) => {
    setProjectName(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.projectName;
    setErrors(newErrors);
  };

  const handleChangeProjectDetails = (e) => {
    setProjectDetails(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.projectDetails;
    setErrors(newErrors);
  };

  const handleChangePriority = (value) => {
    setPriority(value);
    const newErrors = { ...errors };
    delete newErrors.priority;
    setErrors(newErrors);
  };

  const handleChangeDueDate = (e) => {
    setDueDate(e.target.value);
    const newErrors = { ...errors };
    delete newErrors.dueDate;
    setErrors(newErrors);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project successfully created", { duration: 3000 });
      setShowForm(false);
    },
    onError: (error) => {
      toast.error("Error creating project");
    },
  });

  if (isLoading) return <Spinner />;

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!projectName) newErrors.projectName = "Project name is required";
    if (!projectDetails)
      newErrors.projectDetails = "Project details are required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    inputs.forEach((input, index) => {
      if (!input.name)
        newErrors[`subprojectName-${index}`] = "Subproject name is required";
      if (input.selectedUsers.length === 0)
        newErrors[`subprojectUsers-${index}`] =
          "At least one user must be selected for each subproject";
    });

    if (Object.keys(newErrors).length === 0) {
      const newProject = {
        project_name: projectName,
        project_details: projectDetails,
        sub_projects: { allSubProjects: inputs },
        roles: { allRoles: inputs.flatMap((input) => input.selectedUsers) },
        priority: priority,
        due_date: dueDate,
        posted_by: currentUser.nickname,
        organization: currentUser.organization,
      };
      mutate(newProject);
    } else {
      setErrors(newErrors);
      toast.error("All the details must be filled");
    }
  };

  return (
    <form className="project-form merriweather-font" onSubmit={handleSubmit}>
      <div className="project-form-div">
        <div className="new-project-text">Project name:</div>
        <input
          className={`project-form-text ${
            errors.projectName ? "error-input" : ""
          }`}
          type="text"
          id="projectName"
          placeholder="Enter a project name"
          value={projectName}
          onChange={handleChangeProjectName}
        />
        {errors.projectName && (
          <div className="error-message">{errors.projectName}</div>
        )}
      </div>

      {/* Project details input */}
      <div className="project-form-div">
        <div className="new-project-text">Project details:</div>
        <input
          className={`project-form-text ${
            errors.projectDetails ? "error-input" : ""
          }`}
          type="text"
          id="projectDetails"
          placeholder="Enter the project details"
          value={projectDetails}
          onChange={handleChangeProjectDetails}
        />
        {errors.projectDetails && (
          <div className="error-message">{errors.projectDetails}</div>
        )}
      </div>
      <div className="new-project-text">Subprojects:</div>
      {inputs.map((input, index) => (
        <div key={index} className="subproject-group">
          <input
            className={`project-form-text ${
              errors[`subprojectName-${index}`] ? "error-input" : ""
            }`}
            type="text"
            placeholder="Sub-project name"
            value={input.name}
            onChange={(event) => handleSubProjectNameChange(event, index)}
          />
          {errors[`subprojectName-${index}`] && (
            <div className="error-message-sub">
              {errors[`subprojectName-${index}`]}
            </div>
          )}
          <MultipleSelect
            users={usersData}
            selectedNames={input.selectedUsers}
            onSelectedNamesChange={(users) =>
              handleSelectedUsersChange(users, index)
            }
          />
          {errors[`subprojectUsers-${index}`] && (
            <div className="error-message-sub">
              {errors[`subprojectUsers-${index}`]}
            </div>
          )}
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
      <div className="new-project-text">Select priority:</div>
      <PrioritySelect priority={priority} setPriority={handleChangePriority} />
      {errors.priority && (
        <div className="error-message">{errors.priority}</div>
      )}
      <div
        className="form-var"
        style={{ marginTop: "25px", marginBottom: "20px" }}
      >
        <span style={{ marginRight: "25px", marginBottom: "200px" }}>
          Due Date:
        </span>
        <input
          className={` ${errors.dueDate ? "error-input" : ""}`}
          type="date"
          value={dueDate}
          onChange={handleChangeDueDate}
        />
      </div>
      {errors.dueDate && (
        <div className="error-message" style={{ marginTop: "-10px" }}>
          {errors.dueDate}
        </div>
      )}
      <div
        className="form-var"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        {new Date().toLocaleDateString()}
      </div>
      <div className="project-form-div">
        <button className="project-form-text add-btn btn">Add</button>
      </div>
    </form>
  );
}

export default NewProjectForm;
