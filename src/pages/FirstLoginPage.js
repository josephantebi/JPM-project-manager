import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import ColorSelect from "../components/SelectColor";
import getColors from "../services/apiColor";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { getOrganizations } from "../services/apiUsers";
import toast from "react-hot-toast";
import { editUser } from "../services/apiUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import supabase from "../services/supabase";
import { getNicknames } from "../services/apiUsers";
import AllProjectsPage from "../pages/AllProjectsPage";
import initialUsersData from "../data/InitialUsersData";
import initialProjectsData from "../data/InitialProjectsData";
import { createProject } from "../services/apiProjects";
import { createUser } from "../services/apiUsers";
import { duration } from "@mui/material";

function FirstLogin() {
  const navigate = useNavigate();
  const [organizationName, setOrganizationName] = useState("");
  const [nickname, setNickname] = useState("");
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [showDelayedSpinner, setShowDelayedSpinner] = useState(false);
  const { currentUser, setCurrentUser } = useLogInUser();
  const [selectedColor, setSelectedColor] = useState(currentUser.color || "");
  const queryClient = useQueryClient();

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

  const {
    isLoading: isLoadingUsers,
    data: usersData,
    error: errorUsers,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getNicknames,
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

  const { mutate: mutateAddProject, isLoading: isLoadingAddProject } =
    useMutation({
      mutationFn: createProject,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["create project"] });
        console.success("Project successfully created");
      },
      onError: (error) => {
        console.error("Error createing project");
      },
    });

  const { mutate: mutateAddUser, isLoading: isLoadingAddUser } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create user"] });
      console.success("Project successfully created");
    },
    onError: (error) => {
      console.error("Error createing project");
    },
  });

  const handleChangeColor = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleChangeNickname = (event) => {
    const nicknameTemp = event.target.value;
    const formattedNickname = nicknameTemp.replace(/\b(\w)/g, (char) =>
      char.toUpperCase()
    );
    setNickname(formattedNickname);
  };

  const handleChangeOrganizationName = (event) => {
    const organizationNameTemp = event.target.value;
    const formattedOrganization = organizationNameTemp.replace(
      /\b(\w)/g,
      (char) => char.toUpperCase()
    );
    setOrganizationName(formattedOrganization);
  };

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

  function buildingADemoVersion() {
    initialUsersData.forEach((user) => {
      const newUser = {
        first_name: user.first_name,
        surname: user.surname,
        nickname: user.nickname,
        email: user.email,
        organization: organizationName,
        admin: false,
        color: user.color,
        created_at: user.created_at,
        deleted_user: false,
        delete_organization_permission: false,
      };
      mutateAddUser(newUser);
    });
    initialProjectsData.forEach((project) => {
      const newProject = {
        project_name: project.project_name,
        project_details: project.project_details,
        sub_projects: project.sub_projects,
        roles: project.roles,
        created_at: project.created_at,
        due_date: project.due_date,
        percent: project.percent,
        organization: organizationName,
        posted_by: project.posted_by,
      };
      mutateAddProject(newProject);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!organizationName || !selectedColor || !nickname) {
      toast.error("Please complete all required fields.");
      return;
    }

    const nameExists = organizations.some(
      (org) =>
        org.organization &&
        org.organization.toLowerCase() === organizationName.toLowerCase()
    );

    if (nameExists) {
      toast.error(
        "Organization name is already taken. Please choose another name."
      );
      return;
    }

    // const nicknameExists = usersData.some(
    //   (org) =>
    //     org.nickname && org.nickname.toLowerCase() === nickname.toLowerCase()
    // );

    // if (nicknameExists) {
    //   toast.error("Nickname is already taken. Please choose another nickname.");
    //   return;
    // }

    const newUser = {
      first_name: currentUser.first_name,
      surname: currentUser.surname,
      email: currentUser.email,
      color: selectedColor,
      organization: organizationName,
      created_at: currentUser.created_at,
      nickname: nickname,
      admin: true,
      deleted_user: false,
      delete_organization_permission: true,
    };
    const id = currentUser.id;
    mutate({ newUser, id });
    toast.success("User successfully created");
    if (currentUser.color === null && currentUser.organization === null) {
      buildingADemoVersion();
      setShowDelayedSpinner(true);
      setCurrentUser({});
      toast.success("Demo Version created successfully.", {
        duration: 3000,
      });
      setTimeout(() => {
        setShowDelayedSpinner(false);
        // window.location.reload();
      }, 6000);
    }
    setIsLoadingUser(true);
  };

  if (
    isLoadingColors ||
    isLoadingOrganizations ||
    isLoading ||
    isLoadingUser ||
    isLoadingUsers ||
    isLoadingAddUser ||
    isLoadingAddProject ||
    showDelayedSpinner
  ) {
    return <Spinner />;
  }

  if (
    currentUser &&
    currentUser.color !== null &&
    currentUser.organization !== null
  ) {
    return <AllProjectsPage />;
  }

  return (
    <>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="user-form-div">
          <p htmlFor="organizationName" className="form-label">
            Nickname:
          </p>
          <input
            className="organization-input"
            type="text"
            id="organizationName"
            placeholder=""
            value={nickname}
            onChange={handleChangeNickname}
          />
        </div>
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
            onChange={handleChangeOrganizationName}
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
