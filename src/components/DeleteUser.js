import React, { useState, useEffect } from "react";
import { googleLogout } from "@react-oauth/google";
import { useLogInUser } from "../Providers/log-in-user-provider";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../services/apiUsers";
import { editUser } from "../services/apiUsers";
import { editProject } from "../services/apiProjects";
import { deleteProject } from "../services/apiProjects";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useDataProvider } from "../Providers/DataProvider";
import "../style.css";

function DeleteUser() {
  const [showConfirm, setShowConfirm] = useState(false);
  const { currentUser } = useLogInUser();
  const { usersDataProvider, projectsData } = useDataProvider();
  const [currentUserAdmin, setCurrentUserAdmin] = useState(currentUser.admin);
  const [singleAdmin, setSingleAdmin] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: mutateEditUser, isLoading: isLoadingEditUser } = useMutation({
    mutationFn: ({ newUser, id }) => editUser(newUser, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User edited successfully");
      handleLogout();
    },
    onError: (error) => {
      toast.error("Error editing user");
    },
  });

  const { mutate: mutateDeleteUser, isLoading: isLoadingDeleteUser } =
    useMutation({
      mutationFn: (id) => deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        toast.success("User deleted successfully", { duration: 3000 });
      },
      onError: (error) => {
        toast.error("Error deleting user");
      },
    });

  const { mutate: mutateEditProject, isLoading: isLoadingEditProject } =
    useMutation({
      mutationFn: ({ editedProject, id }) => editProject(editedProject, id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
      onError: (error) => {
        toast.error("Error editing projects");
      },
    });

  const { mutate: mutateDeleteProject, isLoading: isLoadingDeleteProject } =
    useMutation({
      mutationFn: (projectId) => deleteProject(projectId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        toast.success("Project deleted successfully", { duration: 3000 });
      },
      onError: (error) => {
        toast.error("Error deleting project");
      },
    });

  useEffect(() => {
    if (currentUser.admin) {
      setCurrentUserAdmin(true);
      const otherAdminExists = usersDataProvider?.some(
        (user) => user.admin && user.id !== currentUser.id
      );
      setSingleAdmin(!otherAdminExists);
    } else {
      setCurrentUserAdmin(false);
    }
  }, []);

  function convertDateToISO(dateString) {
    const parts = dateString.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    date.setHours(12, 0, 0, 0);

    return date.toISOString();
  }

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
        mutateEditProject({ editedProject: object, id: object.id });
      }
      if (object.posted_by === oldName) {
        object.posted_by = newName;
        mutateEditProject({ editedProject: object, id: object.id });
      }
    });
  }

  const handleLogout = () => {
    googleLogout();
    window.location.reload();
  };

  const handleDelete = () => {
    const id = currentUser.id;
    if (singleAdmin && currentUserAdmin) {
      console.log(
        111,
        "currentUserAdmin",
        currentUserAdmin,
        "singleAdmin",
        singleAdmin
      );
      // Organization and user deletion
      // Deleting all projects
      // Deleting all projects function from projectsData

      // Editing the organization of the users to null
      // Editing the organization of the users to null function from usersData

      // Deleting user
      // deleteUser(id);
      console.log("Deleting");
    } else {
      // Edit user
      console.log("Edit");
      const deletedUserNickname = "Former user: " + currentUser.nickname;
      const now = new Date();
      const createdIn = now.toLocaleDateString();
      const newUser = {
        first_name: currentUser.first_name,
        surname: currentUser.surname,
        email: "",
        color: "#989797",
        organization: currentUser.organization,
        created_at: convertDateToISO(createdIn),
        nickname: deletedUserNickname,
        admin: false,
        deleted_user: true,
      };
      updateRolesByName(
        currentUser.nickname,
        deletedUserNickname,
        projectsData
      );
      mutateEditUser({ newUser, id });
    }
    setShowConfirm(false);
  };

  if (
    isLoadingDeleteUser ||
    isLoadingDeleteProject ||
    isLoadingEditUser ||
    isLoadingEditProject
  )
    return <Spinner />;

  return (
    <>
      <div className="delete-user-div">
        <p>
          Please confirm that you want to delete this user. Deleting a user is a
          permanent action and cannot be undone. All associated data and records
          for this user will be irretrievably removed from the system.
        </p>
        {singleAdmin && currentUserAdmin && (
          <div className="delete-user-warning">
            <strong>
              You are the only admin in the organization. Do you wish to delete
              the organization or assign another user as admin before deletion?{" "}
              <br />
              We recommend assigning another user as admin before deleting your
              profile.
            </strong>
          </div>
        )}
      </div>
      <div className="delete-user-mui">
        <Stack sx={{ width: "39%" }} spacing={2}>
          <Alert
            variant="outlined"
            severity="error"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <strong className="alert-text">
                Are you sure you want to proceed with deletion?
              </strong>
            </div>
            {showConfirm ? (
              <div>
                <Button
                  color="warning"
                  onClick={handleDelete}
                  disabled={isLoadingEditUser || isLoadingDeleteUser}
                >
                  {singleAdmin
                    ? "Confirm Delete Organization"
                    : "Confirm Delete"}
                </Button>
                <Button color="inherit" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button color="error" onClick={() => setShowConfirm(true)}>
                {singleAdmin ? "Delete Organization" : "Delete User"}
              </Button>
            )}
          </Alert>
        </Stack>
      </div>
    </>
  );
}

export default DeleteUser;
