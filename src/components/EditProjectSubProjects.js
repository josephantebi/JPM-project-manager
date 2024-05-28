import { useDataProvider } from "../Providers/DataProvider";
import React, { useState } from "react";
import MultipleSelect from "./MultipleSelect";
import "../style.css";

function EditProjectSubProjects({ tempSubProjects, setTempSubProjects }) {
  const { usersDataProvider } = useDataProvider();

  const handleSubProjectNameChange = (index, newName) => {
    const updatedSubProjects = tempSubProjects.map((subProject, idx) => {
      if (idx === index) {
        return { ...subProject, subProjectName: newName };
      }
      return subProject;
    });
    setTempSubProjects(updatedSubProjects);
  };

  const handleSubProjectPercentChange = (index, value) => {
    const newValue = Number(value);
    const correctedValue = Math.max(0, Math.min(100, newValue));
    const updatedSubProjects = tempSubProjects.map((subProject, idx) =>
      idx === index
        ? { ...subProject, subProjectPercent: correctedValue.toString() }
        : subProject
    );
    setTempSubProjects(updatedSubProjects);
  };
  const handleSubProjectRolesChange = (index, roles) => {
    const updatedSubProjects = tempSubProjects.map((subProject, idx) => {
      if (idx === index) {
        return { ...subProject, subProjectRoles: roles };
      }
      return subProject;
    });
    setTempSubProjects(updatedSubProjects);
  };

  function formatNames(names) {
    return names.map((name) =>
      name
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }

  const addNewSubProject = (e) => {
    e.preventDefault();
    const newSubProject = {
      id: tempSubProjects.length + 1, // New ID is length + 1
      subProjectName: "", // Default empty name
      subProjectRoles: [""], // No roles initially
      subProjectPercent: "0", // Default percent as 0
    };
    setTempSubProjects([...tempSubProjects, newSubProject]); // Add to array
  };

  function resetSubProjectIds(subProjects) {
    return subProjects.map((subProject, index) => ({
      ...subProject,
      id: index + 1,
    }));
  }
  function handleRemoveSubproject(e, index) {
    e.preventDefault();
    e.stopPropagation();
    const newInputs = tempSubProjects.slice();
    newInputs.splice(index, 1);
    const reassignedSubProjects = newInputs.map((subProject, index) => ({
      ...subProject,
      id: index + 1,
    }));
    setTempSubProjects(reassignedSubProjects);
  }

  return (
    <>
      <div className="project-form-div">
        <div className="new-project-text">Sub-projects:</div>
      </div>
      <div className="">
        {tempSubProjects.map((subProject, index) => (
          <div key={index} className="">
            <div className="sub-project-name">
              <div className="project-form-div">
                <div className="sub-project-percent">
                  <div className="">
                    <div
                      className="new-project-text"
                      style={{ fontSize: "large" }}
                    >
                      Sub-project {subProject.id}:
                    </div>
                    <textarea
                      key={subProject.id}
                      className="project-details"
                      type="text"
                      value={subProject.subProjectName}
                      onChange={(e) =>
                        handleSubProjectNameChange(index, e.target.value)
                      }
                      style={{ backgroundColor: "#1b2348" }}
                    ></textarea>
                  </div>

                  <div className="">
                    <div
                      className="new-project-text"
                      style={{ fontSize: "large" }}
                    >
                      Percent:
                    </div>
                    <input
                      key={subProject.id}
                      className="project-percent"
                      type="number"
                      min="0"
                      max="100"
                      value={subProject.subProjectPercent}
                      onChange={(e) =>
                        handleSubProjectPercentChange(index, e.target.value)
                      }
                      style={{ backgroundColor: "#1b2348" }}
                    ></input>
                  </div>
                </div>
                <div className="">
                  <div
                    className="new-project-text"
                    style={{ fontSize: "large" }}
                  >
                    Roles:
                  </div>
                  <MultipleSelect
                    users={usersDataProvider}
                    selectedNames={formatNames(subProject.subProjectRoles)}
                    onSelectedNamesChange={(selectedUsers) =>
                      handleSubProjectRolesChange(index, selectedUsers)
                    }
                  />
                  <button
                    className="role-btn remove-subproject-btn"
                    onClick={(e) => handleRemoveSubproject(e, index)}
                  >
                    Remove Subproject
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="role-btn add-subproject-btn"
        onClick={addNewSubProject}
      >
        Add New Subproject
      </button>
      {/* <button className="role-btn add-subproject-btn" type="button">
        Add New Subproject
      </button> */}
    </>
  );
}
export default EditProjectSubProjects;
