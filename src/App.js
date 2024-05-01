import React from "react";
import "./style.css";
import Router from "./routes";
import Toast from "./components/Toaster";

function App() {
  return (
    <>
      <Router />
      <Toast />
    </>
  );
}

export default App;
