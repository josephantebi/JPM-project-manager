import React, { useState } from "react";
import "../style.css";
import FormPropsTextFields from "./LogInForm";
import Spinner from "../components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "../services/apiAuthEmail";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function EmailAndPasswordLogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const queryClient = useQueryClient();
  const {
    data: userData,
    isLoading: isLoadingLogIn,
    mutate: mutateLogIn,
  } = useMutation({
    mutationFn: ({ email, password }) => logIn({ email, password }),
    onSuccess: () => {
      toast.success("User logged in successfully", { duration: 3000 });
    },
    onError: () => {
      toast.error("Email or Password is incorrect");
    },
  });

  // const {
  //   isLoading: isLoadingLogIn,
  //   data: userData,
  //   error: errorUser,
  // } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: () => logIn({ email, password }),
  // });

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let hasError = false;
    if (!password || !email) {
      toast.error("Please enter all fields");
    }
    if (!email) {
      setEmailError(true);
      hasError = true;
    }
    if (!validateEmail(email)) {
      setEmailError(true);
      toast.error("Please enter a valid email address");
      hasError = true;
    }
    if (!password) {
      setPasswordError(true);
      hasError = true;
    }
    if (email) {
      setEmailError(false);
    }
    if (password) {
      setPasswordError(false);
    }
    if (!hasError) {
      mutateLogIn({ email, password });
      console.log(222, userData);
    }
  };

  if (isLoadingLogIn) return <Spinner />;

  return (
    <div className="sign-in-container">
      <FormPropsTextFields
        setEmail={setEmail}
        setPassword={setPassword}
        emailError={emailError}
        passwordError={passwordError}
      />
      <button className="login-btn" onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
}

export default EmailAndPasswordLogIn;
