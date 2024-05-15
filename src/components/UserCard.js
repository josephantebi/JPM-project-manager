import React, { useState } from "react";
import "../style.css";
import { FormControlLabel } from "@mui/material";
import IOSSwitch from "../components/IOSStyleSwitch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "../services/apiUsers";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { useLogInUser } from "../Providers/log-in-user-provider";

function UserCard({ user }) {
  const [isTextVisible, setIsTextVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [adminStatus, setAdminStatus] = useState(user.admin);
  const queryClient = useQueryClient();
  const { currentUser } = useLogInUser();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ editedUser, id }) => editUser(editedUser, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User permissions successfully changed");
    },
    onError: (error) => {
      toast.error("Error editing user");
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

  const saveChanges = () => {
    const editedUser = {
      first_name: user.first_name,
      surname: user.surname,
      email: user.email,
      color: user.color,
      organization: user.organization,
      created_at: user.created_at,
      nickname: user.nickname,
      admin: adminStatus,
    };
    const id = user.id;
    mutate({ editedUser, id });
    setEditMode(false);
  };

  const discardChanges = () => {
    setAdminStatus(user.admin);
    setEditMode(false);
  };

  if (isLoading) {
    return <Spinner />;
  }

  const permissions = adminStatus ? "Admin" : "No permission";

  return (
    <>
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
                <IOSSwitch checked={adminStatus} onChange={handleToggleAdmin} />
              }
              label="Admin Status"
            />
            <button onClick={saveChanges}>Save</button>
            <button onClick={discardChanges}>Cancel</button>
          </div>
        )}
      </span>
    </>
  );
}

export default UserCard;

// function UserCard({ user }) {
//   const [isTextVisible, setIsTextVisible] = useState(false);

//   const toggleTextVisibility = () => {
//     setIsTextVisible(!isTextVisible);
//   };

//   const permissions = user.admin ? "Admin" : "No permission";
//   return (
//     <>
//       <span className="centered-user-card-div">
//         <span>
//           <p className="project-in-name">{user.nickname}</p>
//         </span>
//         {isTextVisible ? (
//           <div>
//             <span>
//               <p className="project-in-name">Nickname: {user.nickname}</p>
//             </span>
//             <span>
//               <p className="project-in-name">First name: {user.first_name}</p>
//             </span>
//             <span>
//               <p className="project-in-name">Surname: {user.surname}</p>
//             </span>

//             <span>
//               <p className="project-in-name">Email: {user.email}</p>
//             </span>
//             <span>
//               <p className="project-in-name">Permission: {permissions}</p>
//             </span>
//             <span
//               className="material-symbols-outlined expand expand-user-card"
//               onClick={toggleTextVisibility}
//               style={{ textAlign: "center" }}
//             >
//               expand_less
//             </span>
//           </div>
//         ) : (
//           <span
//             className="material-symbols-outlined expand"
//             onClick={toggleTextVisibility}
//           >
//             expand_more
//           </span>
//         )}
//         <button>Edit user</button>
//       </span>
//     </>
//   );
// }

// export default UserCard;
