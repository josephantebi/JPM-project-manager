import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function FormPropsTextFields({
  setEmail,
  setPassword,
  emailError,
  passwordError,
}) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        "& label.Mui-focused": {
          color: "white",
        },
        "& label": {
          color: "white",
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "white",
          },
          "&.Mui-focused fieldset": {
            borderColor: "white",
          },
          "& input": {
            color: "white",
          },
          "&:hover input": {
            color: "white",
          },
          "& label.MuiInputLabel-root": {
            color: "white",
          },
          "&:hover label.MuiInputLabel-root": {
            color: "white",
          },
          "&.Mui-focused label.MuiInputLabel-root": {
            color: "white",
          },
        },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          error={emailError}
          helperText={emailError ? "Email is required" : ""}
          id="outlined-required"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "white" } }}
        />
      </div>
      <div>
        <TextField
          error={passwordError}
          helperText={passwordError ? "Password is required" : ""}
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          InputLabelProps={{ style: { color: "white" } }}
        />
      </div>
    </Box>
  );
}
