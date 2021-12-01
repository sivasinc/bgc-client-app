import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import "./step1.css";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { width } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Grid from "@material-ui/core/Grid";

const Step1 = ({ handleInputChange, userProfile }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
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
          className="signUp__form__lastName"
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
        <h4>Login Information</h4>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box>
              <Grid item xs={12} md={12}>
                <TextField
                  style={matches ? { width: "100%" } : { width: "96%" }}
                  className="signUp__form__password"
                  required
                  fullWidth
                  error={!!errorMessage.email}
                  name="email"
                  id="outlined-required"
                  label="Email Address"
                  value={email}
                  variant="outlined"
                  onChange={handleInputChange}
                  helperText={errorMessage.email}
                />
              </Grid>
              <div></div>
              <Grid item xs={12} md={12}>
                <FormControl
                  sx={
                    matches
                      ? { width: "100%", margin: "15px 0px 10px 0px" }
                      : { width: "96%", margin: "15px 0px 10px 0px" }
                  }
                  variant="outlined"
                >
                  <InputLabel
                    error={!!errorMessage.password}
                    htmlFor="outlined-adornment-password"
                  >
                    Password *
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    error={!!errorMessage.password}
                    id="outlined-adornment-password"
                    label="Password"
                    name="password"
                    type={showElement.showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("Password")}
                          name="password"
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showElement.showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    error={!!errorMessage.password}
                    id="outlined-weight-helper-text"
                  >
                    {!errorMessage.password
                      ? "Case sensitive. Must be at least 6 characters long and can contain numbers and symbols "
                      : errorMessage.password}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <div></div>
              <Grid item xs={12} md={12}>
                <FormControl
                  sx={
                    matches
                      ? { width: "100%", margin: "10px 0px 10px 0px" }
                      : { width: "96%", margin: "10px 0px 10px 0px" }
                  }
                  variant="outlined"
                >
                  <InputLabel
                    error={!!errorMessage.confirmPassword}
                    htmlFor="outlined-password-input"
                  >
                    Confirm Password *
                  </InputLabel>
                  <OutlinedInput
                    // className="signUp__form__password"
                    required
                    fullWidth
                    error={!!errorMessage.confirmPassword}
                    id="outlined-password-input"
                    label="Confirm Password"
                    InputLabelProps={{ shrink: true }}
                    name="confirmPassword"
                    type={showElement.showCnfPassword ? "text" : "password"}
                    autoComplete="current-password"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={handleInputChange}
                    // helperText={errorMessage.confirmPassword}
                    // InputProps={{

                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("cnfPassword")}
                          edge="end"
                        >
                          {showElement.showCnfPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText
                    error={!!errorMessage.confirmPassword}
                    id="outlined-weight-helper-text"
                  >
                    {errorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <div></div>
            </Box>
          </Grid>
        </Grid>
        {/* <div className="signUp__form_login">
          <TextField
          
            required
            fullWidth
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
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("Password")}
                    name="password"
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showElement.showPassword ? (
                      <VisibilityOff fontSize="small"/>
                    ) : (
                      <Visibility fontSize="small"/>
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
            InputLabelProps={{ shrink: true }}
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
          
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword("cnfPassword")}
                  
                  >
                   {showElement.showCnfPassword ? (
                      <VisibilityOff fontSize="small"/>
                    ) : (
                      <Visibility fontSize="small"/>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

Step1.propTypes = {};

export default Step1;
