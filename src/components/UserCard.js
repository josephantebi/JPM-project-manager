import React, { useState } from "react";
import "../style.css";
import { FormControlLabel } from "@mui/material";
import IOSSwitch from "../components/IOSStyleSwitch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../services/apiUsers";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { useLogInUser } from "../Providers/log-in-user-provider";
import TextField from "@mui/material/TextField";
import { editProject } from "../services/apiProjects";
import { deleteUser } from "../services/apiUsers";
import { useDataProvider } from "../Providers/DataProvider";

function UserCard({ user }) {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adminStatus, setAdminStatus] = useState(user.admin);
  const [assignMode, setAssignMode] = useState(false);
  const [newAssignment, setNewAssignment] = useState("");
  const { currentUser } = useLogInUser();
  const { usersDataProvider, projectsData } = useDataProvider();
  const queryClient = useQueryClient();

  // const {
  //   isLoading: isLoadingData,
  //   data: projectsData,
  //   error,
  // } = useQuery({
  //   queryKey: ["projects"],
  //   queryFn: () => getProjectsByOrganization(organization),
  // });

  const { mutate: mutateEditUser, isLoading: isLoadingEditUser } = useMutation({
    mutationFn: ({ editedUser, id }) => editUser(editedUser, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User permissions successfully changed");
    },
    onError: (error) => {
      toast.error("Error editing user");
    },
  });

  const { mutate: mutateProject, isLoading: isLoadingProject } = useMutation({
    mutationFn: ({ editedProject, id }) => editProject(editedProject, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error("Error editing projects");
    },
  });

  const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
    useMutation({
      mutationFn: (id) => deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: (error) => {
        toast.error("Error deleting user");
      },
    });

  const toggleTextVisibility = () => {
    if (!editMode) {
      setIsTextVisible(!isTextVisible);
    }
  };

  const handleToggleAdmin = (event) => {
    setAdminStatus(event.target.checked);
  };

  function updateRolesByName(oldName, newName, objectsList) {
    const lowerOldName = oldName.toLowerCase();

    objectsList.forEach((object) => {
      let isRolesChanged = false;
      let isSubProjectsChanged = false;

      if (object.roles && object.roles.allRoles) {
        const newRoles = object.roles.allRoles.map((role) => {
          if (role.toLowerCase() === lowerOldName) {
            isRolesChanged = true;
            return newName;
          }
          return role;
        });
        if (isRolesChanged) object.roles.allRoles = newRoles;
      }
      if (object.sub_projects && object.sub_projects.allSubProjects) {
        object.sub_projects.allSubProjects.forEach((subProject) => {
          const newSubProjectRoles = subProject.subProjectRoles.map((role) => {
            if (role.toLowerCase() === lowerOldName) {
              isSubProjectsChanged = true;
              return newName;
            }
            return role;
          });
          if (isSubProjectsChanged)
            subProject.subProjectRoles = newSubProjectRoles;
        });
      }
      if (isRolesChanged || isSubProjectsChanged) {
        mutateProject({ editedProject: object, id: object.id });
      }
      if (object.posted_by === oldName) {
        object.posted_by = newName;
        mutateProject({ editedProject: object, id: object.id });
      }
    });
  }

  const discardChanges = () => {
    setAdminStatus(user.admin);
    setEditMode(false);
  };

  const discardAssignmentChanges = () => {
    setNewAssignment("");
    setAssignMode(false);
  };

  const saveChanges = () => {
    const editedUser = {
      first_name: user.first_name,
      surname: user.surname,
      email: user.email,
      color: user.color,
      organization: user.organization,
      created_at: user.created_at,
      nickname: user.nickname,
      admin: user.admin,
    };
    const id = user.id;
    mutateEditUser({ editedUser, id });
    setEditMode(false);
  };

  const saveAssignment = () => {
    setAssignMode(false);
    const userToFind = usersDataProvider.find(
      (user) => user.email === newAssignment
    );
    updateRolesByName(user.nickname, userToFind.nickname, projectsData);
    mutateDeleteUser(user.id);
    toast.success("Assignment updated successfully!");
  };

  if (isLoadingEditUser || isLoadingProject || isLoadingDeleteUser) {
    return <Spinner />;
  }

  const permissions = adminStatus ? "Admin" : "No permission";

  return (
    <>
      {user.deleted_user ? (
        <div className="centered-user-card-div">
          <p className="project-in-name">{user.nickname}</p>
          {isTextVisible && !editMode ? (
            <div>
              <span>
                <p className="project-in-name">Nickname: {user.nickname}</p>
              </span>
              <span>
                <p className="project-in-name">First name: {user.first_name}</p>
              </span>
              <span>
                <p className="project-in-name">Surname: {user.surname}</p>
              </span>
              <span
                className="material-symbols-outlined expand expand-user-card"
                onClick={toggleTextVisibility}
                style={{ textAlign: "center" }}
              >
                expand_less
              </span>
            </div>
          ) : (
            !editMode && (
              <span
                className="material-symbols-outlined expand"
                onClick={toggleTextVisibility}
              >
                expand_more
              </span>
            )
          )}
          {assignMode ? (
            <>
              <TextField
                label="Enter Email"
                variant="outlined"
                value={newAssignment}
                onChange={(e) => setNewAssignment(e.target.value.trim())}
                size="small"
                style={{ margin: "0 8px" }}
              />
              <button
                onClick={saveAssignment}
                variant="contained"
                color="success"
              >
                Save
              </button>
              <button
                onClick={discardAssignmentChanges}
                variant="outlined"
                color="error"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setAssignMode(true)}
              variant="contained"
              color="primary"
            >
              Assign User
            </button>
          )}
        </div>
      ) : (
        <span className="centered-user-card-div">
          <span>
            <p className="project-in-name">{user.nickname}</p>
          </span>
          {isTextVisible && !editMode ? (
            <div>
              <span>
                <p className="project-in-name">Nickname: {user.nickname}</p>
              </span>
              <span>
                <p className="project-in-name">First name: {user.first_name}</p>
              </span>
              <span>
                <p className="project-in-name">Surname: {user.surname}</p>
              </span>
              <span>
                <p className="project-in-name">Email: {user.email}</p>
              </span>
              <span>
                <p className="project-in-name">Permission: {permissions}</p>
              </span>
              <span
                className="material-symbols-outlined expand expand-user-card"
                onClick={toggleTextVisibility}
                style={{ textAlign: "center" }}
              >
                expand_less
              </span>
            </div>
          ) : (
            !editMode && (
              <span
                className="material-symbols-outlined expand"
                onClick={toggleTextVisibility}
              >
                expand_more
              </span>
            )
          )}
          {!editMode && user.nickname !== currentUser.nickname && (
            <button onClick={() => setEditMode(true)}>Edit user</button>
          )}
          {editMode && (
            <div>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={adminStatus}
                    onChange={handleToggleAdmin}
                  />
                }
                label="Admin Status"
              />
              <button onClick={saveChanges}>Save</button>
              <button onClick={discardChanges}>Cancel</button>
            </div>
          )}
        </span>
      )}
    </>
  );
}

export default UserCard;
