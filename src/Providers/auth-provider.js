import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useState, createContext } from "react";
import toast from "react-hot-toast";
import { useLogInUser } from "../Providers/log-in-user-provider";
import supabase from "../services/supabase";
import id from "../private/google-auth";

function GoogleAuth() {
  const clientId = id;
  const { setCurrentUser } = useLogInUser();

  function convertDateToISO(dateString) {
    const parts = dateString.split(".");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    date.setHours(12, 0, 0, 0);

    return date.toISOString();
  }

  const handleSuccess = async (credentialResponse) => {
    try {
      // Decode the JWT token to extract user data
      const { given_name, family_name, email } = JSON.parse(
        atob(credentialResponse.credential.split(".")[1])
      );

      // Check if user already exists in the roles table
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (existingUser === null) {
        // Insert new user into roles table
        const now = new Date();
        const createdIn = now.toLocaleDateString();
        const newUserObj = {
          first_name: given_name,
          surname: family_name,
          email: email,
          color: "rgb(57, 154, 164)",
          created_at: convertDateToISO(createdIn),
        };
        setCurrentUser(newUserObj);
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([newUserObj]);

        if (insertError) {
          console.error("Error inserting user:", insertError);
          toast.error("Error storing user data");
          return;
        }

        setCurrentUser(newUser[0]);
        toast.success("User registered successfully");
      } else {
        setCurrentUser(existingUser);
        toast.success("User logged in successfully");
      }
    } catch (error) {
      console.error("Error handling Google login:", error);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {/* <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleSuccess(credentialResponse);
        }}
        onError={() => toast.error("Error")}
        className="google-login-button"
      /> */}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          handleSuccess(credentialResponse);
        }}
        onError={() => toast.error("Error")}
        theme="filled_blue" // Theme of the button: 'outline', 'filled_blue', or 'filled_black'
        type="standard" // Type of the button: 'standard' or 'icon'
        size="large" // Size of the button: 'small', 'medium', or 'large'
        text="signin_with" // Text to display: 'signin_with', 'signup_with', 'continue_with', or 'signin'
        shape="pill" // Shape of the button: 'rectangular', 'pill', 'circle', or 'square'
        logo_alignment="center" // Logo alignment: 'left' or 'center'
      />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
