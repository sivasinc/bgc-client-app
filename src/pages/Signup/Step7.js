import React from "react";
import {  sendEmailVerification} from "firebase/auth";
import { auth } from "../../firebase";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";

const Step7 = ({ userProfile: { email } = "", error, loading }) => {
  console.log(error);
  const progressSection = (
    <div className="spinnerDiv">
      <CircularProgress size={100} thickness={2} />
    </div>
  );
  const handleResend = ()=>{
    console.log(auth.currentUser)
    debugger
    sendEmailVerification(auth.currentUser, {
      url: "https://bgc-functions.web.app/login",
    }).then(()=>{
      alert('Email sent!')

    })
  }

  return (
    <Grid container>
      <Grid item md={2} />
      <Grid item xs={12} md={8}>
        <div className="signUp__section">
          {loading ? (
            progressSection
          ) : (
            <div className="last_section">
              {error != null ? (
                <p>Error : {error} </p>
              ) : (
                <div style={{textAlign: 'center'}}>
                  <div className="box_header">
                    <CheckCircleIcon
                      color="primary"
                      className="step7_section__checkBar"
                    />
                    <h4 className="headerh4">Thank you</h4>
                  </div>

                  <p>
                    An activation email has been sent to
                    <span style={{ fontWeight: "bold" }}> {email}</span>. The
                    link will expire in 6 hours.
                  </p>
                  <p>
                    Please follow the instructions on the email to complete your
                    profile registration.
                  </p>
                </div>
              )}
            <Button variant='contained' onClick={handleResend}>
              RESEND VERIFICATION LINK
            </Button>
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

Step7.propTypes = {};

export default Step7;
