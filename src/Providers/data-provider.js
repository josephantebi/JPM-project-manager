import { createContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLogInUser } from "./log-in-user-provider";
import { getProjectsByPostedBy } from "../services/apiProjects";
import { getProjectsByOrganization } from "../services/apiProjects";
import { getUsersByOrganization } from "../services/apiUsers";
import getColors from "../services/apiColor";

export const DataContext = createContext(null);

export function DataProvider({ children }) {
  const { currentUser } = useLogInUser();
  const [projectsData, setProjectsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [colorsData, setColorsData] = useState([]);
  const organization = currentUser.organization;
  const postedBy = currentUser.nickname;

  const {
    data: projectsByOrganization,
    isLoading: isLoadingProjects,
    error: errorProjects,
  } = useQuery({
    queryKey: ["allProjectsByOrganization"],
    queryFn: () => getProjectsByOrganization(organization),
  });

  const {
    data: usersByOrganization,
    isLoading: isLoadingUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["allUsersByOrganization"],
    queryFn: () => getUsersByOrganization(organization),
  });

  const {
    data: postByData,
    isLoading: isLoadingPostBy,
    error: errorPostBy,
  } = useQuery({
    queryKey: ["projectsByPostedBy"],
    queryFn: () => getProjectsByPostedBy(postedBy),
  });

  const {
    data: allColors,
    isLoading: isLoadingColors,
    error: errorColors,
  } = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  // useEffect(() => {
  //   fetchUser();
  // }, []);
  useEffect(() => {
    if (!isLoadingProjects && !errorProjects) {
      setProjectsData(projectsByOrganization || []);
    }
    if (!isLoadingUsers && !errorUsers) {
      setUsersData(usersByOrganization || []);
    }
    if (!isLoadingPostBy && !errorPostBy) {
      setUserProjects(postByData || []);
    }
    if (!isLoadingColors && !errorColors) {
      setColorsData(allColors || []);
    }
  }, [
    projectsData,
    usersByOrganization,
    postByData,
    allColors,
    isLoadingProjects,
    isLoadingUsers,
    isLoadingPostBy,
    isLoadingColors,
    errorProjects,
    errorUsers,
    errorPostBy,
    errorColors,
  ]);

  // useEffect(() => {
  //   if (projectsByOrganization) setProjectsData(projectsByOrganization);
  //   if (usersByOrganization) setUsersData(usersByOrganization);
  //   if (postByData) setUserProjects(postByData);
  //   if (allColors) setColorsData(allColors);
  // }, [projectsByOrganization, usersByOrganization, postByData, allColors]);

  const value = {
    projectsData,
    usersData,
    userProjects,
    colorsData,
    isLoadingProjects,
    isLoadingUsers,
    isLoadingPostBy,
    isLoadingColors,
    // projectsByOrganization,
    isLoading:
      isLoadingUsers || isLoadingProjects || isLoadingPostBy || isLoadingColors,
    errors: { errorUsers, errorProjects, errorPostBy, errorColors },
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
