import React from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Fullprojectpage from "./pages/Fullprojectpage";
import ProjectList from "./components/ProjectList";
import EditProjectpage from "./pages/EditProject";
import AboutJPM from "./pages/AboutJPM";
import AboutMe from "./pages/AboutMe";
import JPMvision from "./pages/JPMvision";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="aboutJPM" element={<AboutJPM />} />
        <Route path="aboutMe" element={<AboutMe />} />
        <Route path="JPMvision" element={<JPMvision />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="projects/:id" element={<Fullprojectpage />} />
        <Route path="projects/:id/edit" element={<EditProjectpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
