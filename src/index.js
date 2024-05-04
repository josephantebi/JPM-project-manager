import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { ProjectManagerProvider } from "./Providers/Project-Manager-Provider";
// import { UserProvider } from "./Providers/User-Provider";
import { LogInUserProvider } from "./Providers/log-in-user-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ProjectManagerProvider>
      <UserProvider> */}
    <LogInUserProvider>
      <App />
    </LogInUserProvider>
    {/* </UserProvider>
    </ProjectManagerProvider> */}
  </React.StrictMode>
);
