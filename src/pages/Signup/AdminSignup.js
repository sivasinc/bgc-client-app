import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI Stuff
import Typography from "@material-ui/core/Typography";
// Redux stuff
import { connect } from "react-redux";
import { signupAdminUser } from "../../redux/actions/userActions";
import Grid from "@material-ui/core/Grid";
import "./signup.css";
import Step1 from "./step1";
import validate from "./Validate";
import { Button } from "@mui/material";

const AdminSignup = ({ signupAdminUser, history, UI }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errorMessage: {},
    error: false,
    disabled: false,
  });


  const handleInputChange = (event) => {
    setUserProfile({ ...userProfile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = userProfile

    const request = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    }

    const errors = validate(request)
    if (Object.keys(errors).length) {
      return setUserProfile((_userProfile) => ({ ..._userProfile, errorMessage: errors, error: true }))
    }
    await signupAdminUser(request);
    return history.push('/login')
  }


  const { errors, loading } = UI;
  const progressSection = (
    <div className="spinnerDiv">
      <CircularProgress size={200} thickness={2} />
    </div>
  );

  return (
    <div>
      <Grid container>
        <Grid item md={2} />
        <Grid xs={12} md={8}>
          {loading ? (
            progressSection
          ) : (
            <div className="signUp">
              <div className="signUpHeader">
                <div className="logo_div">
                  <img
                    className="img"
                    src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/bgc-logo.svg?alt=media&token=0f61a406-04b2-42a7-98ee-43f4d2183524"
                  />
                </div>
                <div className="heading_div">
                  <h1>Alumnae Portal</h1>
                  <h3>Admin Sign-up</h3>
                </div>
              </div>
              <div className="signUp__section">
                {errors && (
                  <Typography variant="body2">{errors.general}</Typography>
                )}
                <Step1
                  handleInputChange={handleInputChange}
                  userProfile={userProfile}
                />
                <div className="signUp__footer">
                  <div className="signUp__footer__nextBtn">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSubmit()}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Grid>

      </Grid>

    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapDispatchToProps = { signupAdminUser };

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignup);