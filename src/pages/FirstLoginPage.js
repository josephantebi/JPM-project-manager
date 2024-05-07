import React, { useState, useEffect } from "react";
import ColorSelect from "../components/SelectColor";
import getColors from "../services/apiColor";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { getOrganizations } from "../services/apiUsers";
import toast from "react-hot-toast";
import { editUser, getUsersIdByEmail } from "../services/apiUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import supabase from "../services/supabase";
import AllProjectsPage from "../pages/AllProjectsPage";

function FirstLogin() {
  const [organizationName, setOrganizationName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const { currentUser, setCurrentUser } = useLogInUser();
  const queryClient = useQueryClient();

  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleChangeName = (event) => {
    setOrganizationName(event.target.value);
  };

  const {
    isLoading: isLoadingColors,
    data: colorsData,
    error: errorColors,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  const {
    isLoading: isLoadingOrganizations,
    data: organizations,
    error: errorOrganizations,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newUser, id }) => editUser(newUser, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      toast.error("Error editing user");
    },
  });

  const checkAndUpdateUser = async () => {
    try {
      const { data: existingUser, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", currentUser.email)
        .single();

      if (error) {
        throw error;
      }
      if (existingUser) {
        setCurrentUser(existingUser);
        // Check if both color and organization are not null
        if (existingUser.color !== null && existingUser.organization !== null) {
          setIsLoadingUser(false);
        }
        return existingUser;
      }
      return null;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };
  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const existingUser = await checkAndUpdateUser();
        if (
          existingUser &&
          existingUser.color !== null &&
          existingUser.organization !== null
        ) {
          setCurrentUser(existingUser);
          clearInterval(intervalId);
          setIsLoadingUser(false);
        }
      } catch (error) {
        console.error("Error in interval checking user:", error);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  if (isLoadingColors || isLoadingOrganizations || isLoading || isLoadingUser) {
    return <Spinner />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!organizationName || !selectedColor) {
      toast.error("Please complete all required fields.");
      return;
    }
    // Check if the organization name already exists
    const nameExists = organizations.some(
      (org) => org.organization === organizationName.toLowerCase()
    );

    if (nameExists) {
      toast.error(
        "Organization name is already taken. Please choose another name."
      );
      return;
    }

    const newUser = {
      first_name: currentUser.first_name,
      surname: currentUser.surname,
      email: currentUser.email,
      color: selectedColor,
      organization: organizationName,
      created_at: currentUser.created_at,
    };
    const id = currentUser.id;
    mutate({ newUser, id });
    setIsLoadingUser(true);
  };

  if (
    currentUser &&
    currentUser.color !== null &&
    currentUser.organization !== null
  ) {
    toast.success("Saved successfully", { duration: 3000 });
    return <AllProjectsPage />;
  }

  return (
    <>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-form-div">
          <p htmlFor="organizationName" className="form-label">
            Organization name:
          </p>
          <input
            className="organization-input"
            type="text"
            id="organizationName"
            placeholder=""
            value={organizationName}
            onChange={handleChangeName}
          />
        </div>
        <div className="color-select-wrapper">
          <p className="form-color">User Color:</p>
          <ColorSelect
            colors={colorsData}
            selectedColor={selectedColor}
            onChange={handleChangeColor}
          />
        </div>
        <div className="save-button-wrapper">
          <button className="save-button">Save</button>
        </div>
      </form>
    </>
  );
}

export default FirstLogin;
