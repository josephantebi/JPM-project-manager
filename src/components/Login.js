import React, { useState, useEffect } from "react";
import { useLogInUser } from "../Providers/log-in-user-provider";
import AllProjectsPage from "../pages/AllProjectsPage";
import supabase from "../services/supabase";
import Spinner from "../components/Spinner";
import FirstLogin from "../pages/FirstLoginPage";

function Login() {
  const { currentUser, setCurrentUser } = useLogInUser();
  const [isLoading, setIsLoading] = useState(true);
  const [needColor, setNeedColor] = useState(false);
  const [needOrganization, setNeedOrganization] = useState(false);

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
        setNeedColor(existingUser.color === null);
        setNeedOrganization(existingUser.organization === null);
        setIsLoading(false);
        return existingUser;
      }
      return null;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!currentUser || !currentUser.id) {
      const intervalId = setInterval(async () => {
        const result = await checkAndUpdateUser();
        if (result) {
          clearInterval(intervalId);
        }
      }, 2000);
      return () => clearInterval(intervalId);
    } else {
      setNeedColor(currentUser.color === null);
      setNeedOrganization(currentUser.organization === null);
      setIsLoading(false);
    }
  }, [currentUser]);

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>{needColor || needOrganization ? <FirstLogin /> : <AllProjectsPage />}</>
  );
}

export default Login;
