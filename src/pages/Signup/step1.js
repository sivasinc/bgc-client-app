import React, { useState } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SelectElement from "./SelectElement";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import "./step1.css";

const Step1 = ({
  handleSelectChange,
  securityQuestions,
  handleInputChange,
  userProfile,
  handleSecurityInputChange,
  
}) => {
  const [showElement, sethowElement] = useState({
    showPassword: false,
    showCnfPassword: false,
  });
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    errorMessage,
  } = userProfile;
  console.log(securityQuestions);
  
  const handleClickShowPassword = (pass) => {
    pass === "Password"
      ? sethowElement((prev) => ({ ...prev, showPassword: !prev.showPassword }))
      : sethowElement((prev) => ({
          ...prev,
          showCnfPassword: !prev.showCnfPassword,
        }));
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="step1">
      <h4>Create your account</h4>
      <div className="signUp__form_names">
        <TextField
          className="signUp__form__page"
          required
          error={!!errorMessage.firstName}
          name="firstName"
          id="outlined-required"
          label="First Name"
          value={firstName}
          variant="outlined"
          onChange={handleInputChange}
          helperText={errorMessage.firstName}
        />
        <TextField
          className="signUp__form__page"
          required
          error={!!errorMessage.lastName}
          id="outlined-required"
          label="Last Name"
          name="lastName"
          value={lastName}
          variant="outlined"
          onChange={handleInputChange}
          helperText={errorMessage.lastName}
        />
      </div>
      <div className="signup__loginInfo">
        <h3>Login Information</h3>
        <div className="signUp__form_login">
          <TextField
            className="signUp__form__email"
            required
            error={!!errorMessage.email}
            name="email"
            id="outlined-required"
            label="Email Address"
            value={email}
            variant="outlined"
            onChange={handleInputChange}
            helperText={errorMessage.email}
          />
          <TextField
            variant="outlined"
            className="signUp__form__password"
            required
            error={!!errorMessage.password}
            id="outlined-adornment-password"
            label="Password"
            name="password"
            type={showElement.showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
            helperText={errorMessage.password}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("Password")}
                    name="password"
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showElement.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="signUp__form__password"
            error={!!errorMessage.confirmPassword}
            required
            id="outlined-password-input"
            label="Confirm Password"
            name="confirmPassword"
            type={
              showElement.showCnfPassword ? "text" : "password"
            }
            autoComplete="current-password"
            variant="outlined"
            value={confirmPassword}
            onChange={handleInputChange}
            helperText={errorMessage.confirmPassword}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("cnfPassword")}
                    // onMouseDown={handleMouseDownPassword}
                  >
                    {showElement.showCnfPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}; 

Step1.propTypes = {};

export default Step1;