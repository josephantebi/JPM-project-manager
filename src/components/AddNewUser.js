import React, { useState } from "react";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { editUser } from "../services/apiUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import supabase from "../services/supabase";
import "../style.css";

function AddNewUser() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useLogInUser();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: ({ newUser, id }) => editUser(newUser, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User added successfully!");
    },
    onError: (error) => {
      toast.error("Error editing user");
    },
  });

  const checkAndUpdateUser = async () => {
    setIsLoading(true);
    let attempts = 0;
    const intervalId = setInterval(async () => {
      attempts++;
      if (attempts > 5) {
        // 10 seconds have passed (5 attempts * 2 seconds each)
        clearInterval(intervalId);
        setIsLoading(false);
        toast.error("User fetch timed out");
        return;
      }

      try {
        const { data: existingUser, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (existingUser && existingUser.email === email) {
          clearInterval(intervalId);
          setIsLoading(false);

          if (existingUser.organization === null) {
            const newUser = {
              first_name: existingUser.first_name,
              surname: existingUser.surname,
              email: existingUser.email,
              color: existingUser.color,
              organization: currentUser.organization,
              created_at: existingUser.created_at,
              nickname: existingUser.nickname,
              admin: false,
              delete_organization_permission: false,
            };
            const id = existingUser.id;
            mutate({ newUser, id });
          } else {
            toast.error("User is already in another organization");
          }
          return;
        }

        if (error) throw new Error(error.message);
      } catch (error) {
        clearInterval(intervalId);
        setIsLoading(false);
        toast.error("Error: " + error.message);
      }
    }, 2000);
  };

  return (
    <div className="add-new-user-container">
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter new user email"
        type="email"
        className="add-new-user-input"
      />
      <button
        className="edit-user-btn"
        onClick={checkAndUpdateUser}
        disabled={isLoading}
      >
        Add User
      </button>
      {isLoading && <Spinner />}
    </div>
  );
}

export default AddNewUser;
