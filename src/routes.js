import React from "react";
import "./style.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Fullprojectpage from "./pages/Fullprojectpage";
import AdminPage from "./pages/AdminPage";
import EditProjectpage from "./pages/EditProjectpage";
import AboutJPM from "./pages/AboutJPM";
import AboutMe from "./pages/AboutMe";
import JPMvision from "./pages/JPMvision";
import MyProfile from "./pages/MyProfile";
import { useLogInUser } from "./Providers/log-in-user-provider";
import JpmNotFoundPage from "./pages/JpmNotFoundPage";

function Router() {
  const { connected } = useLogInUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="aboutJPM" element={<AboutJPM />} />
        <Route path="aboutMe" element={<AboutMe />} />
        <Route path="JPMvision" element={<JPMvision />} />
        <Route path="projects" element={<Navigate to="/" />} />
        <Route
          path="myProfile"
          element={connected ? <MyProfile /> : <Navigate to="/" />}
        />
        <Route
          path="adminPage"
          element={connected ? <AdminPage /> : <Navigate to="/" />}
        />
        <Route
          path="projects/:id"
          element={connected ? <Fullprojectpage /> : <Navigate to="/" />}
        />
        <Route
          path="projects/:id/edit"
          element={connected ? <EditProjectpage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<JpmNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
