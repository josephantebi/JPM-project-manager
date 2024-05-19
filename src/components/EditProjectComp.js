import React, { useEffect } from "react";
import EditProjectSubProjects from "./EditProjectSubProjects";

function EditProject({
  foundProject,
  matchedRoles,
  projectName,
  setProjectName,
  projectDetails,
  setProjectDetails,
  tempSubProjects,
  setTempSubProjects,
  dueDate,
  setDueDate,
}) {
  const sub_projects = foundProject.sub_projects.allSubProjects;
  const handleNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleDetailsChange = (event) => {
    setProjectDetails(event.target.value);
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  useEffect(() => {
    const textarea = document.querySelector(".project-name-input");
    const adjustTextareaHeight = (textarea) => {
      if (!textarea) return;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    };
    const handleResize = () => {
      adjustTextareaHeight(textarea);
    };
    adjustTextareaHeight(textarea);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalPercent = sub_projects.reduce(
    (acc, cur) => acc + Number(cur.subProjectPercent),
    0
  );
  const averagePercent = totalPercent / sub_projects.length;

  useEffect(() => {
    setDueDate(foundProject.due_date || "");
  }, [foundProject.due_date]);

  useEffect(() => {
    const textarea = document.querySelector(".project-name-input");
    if (textarea) {
      adjustTextareaHeight(textarea);
      textarea.addEventListener("input", () => adjustTextareaHeight(textarea));
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener("input", () =>
          adjustTextareaHeight(textarea)
        );
      }
    };
  }, []);

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="project full-project">
      <span className="merriweather-font">
        <div style={{ marginTop: "30px" }}>New project's name:</div>
        <div className="project-form-div">
          <textarea
            className="project-name"
            type="text"
            value={projectName}
            onChange={handleNameChange}
            style={{ backgroundColor: "#1b2348" }}
          ></textarea>
        </div>
        <div style={{ marginTop: "30px" }}>New project details:</div>
        <div className="project-form-div">
          <textarea
            className="project-details project-name-input"
            type="text"
            value={projectDetails}
            onChange={handleDetailsChange}
            style={{ backgroundColor: "#1b2348" }}
          ></textarea>
        </div>
        <EditProjectSubProjects
          tempSubProjects={tempSubProjects}
          setTempSubProjects={setTempSubProjects}
        />
        <div
          className="form-var due-date-edit"
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
        <div className="project-data merriweather-font">
          <span
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <span>Creation date:</span>
            <span>
              {foundProject.created_at
                ? formatDate(foundProject.created_at)
                : "N/A"}
            </span>
          </span>
          <span
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <span>Due Date:</span>
            <span>
              {foundProject.due_date
                ? formatDate(foundProject.due_date)
                : "N/A"}
            </span>
          </span>
          <span>Percent: {averagePercent.toFixed() + "%"}</span>
        </div>
      </span>
      <div
        style={{
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          marginLeft: "10px",
        }}
      >
        <div
          style={{
            fontSize: "25px",
            textAlign: "center",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          Roles:
        </div>
        <div className="in-project-role-div merriweather-font">
          <ul>
            {matchedRoles.map((cat) => (
              <li key={cat.id}>
                <div
                  className="in-project-role "
                  style={{ backgroundColor: cat.color }}
                >
                  {cat.nickname.toUpperCase()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default EditProject;
