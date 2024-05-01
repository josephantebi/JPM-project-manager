import React from "react";
import "../style.css";
import { Toaster } from "react-hot-toast";
function Toast() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: { duration: 3000 },
        error: { duration: 3000 },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#000839",
          color: "white",
        },
      }}
    />
  );
}

export default Toast;
