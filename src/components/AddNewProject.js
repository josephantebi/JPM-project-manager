import React from "react";
function AddNewProject({ showForm, setShowForm }) {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <button
        className="btn btn-add-new-project merriweather-font"
        onClick={() => setShowForm((show) => !show)}
        onSubmit={handleSubmit}
      >
        {showForm ? "Close" : "Add new project"}
      </button>
    </div>
  );
}

export default AddNewProject;
