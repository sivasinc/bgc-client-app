import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CircularProgress from '@mui/material/CircularProgress';

const Step7 = ({ userProfile: { email } = "", error, loading }) => {
    console.log(error);
  const progressSection = (
    <div className="spinnerDiv">
      <CircularProgress size={100} thickness={2} />
    </div>
  );

  return (
    <Grid container>
      <Grid item md={2} />
      <Grid item xs={12} md={8}>
        <div className="signUp__section">
          {loading ? (
            progressSection
          ) : (
            <div className="last_section">
              
              {error != null ?(
                <p>Error : {error} </p>
              ) :(<div>
                  <div className="box_header">
                   <CheckCircleIcon color="primary" className="step7_section__checkBar"/>
                  <h4 className="headerh4">Thank you</h4>
                  </div>
               
                <p>An activation email has been sent to 
                <span style={{ fontWeight: "bold" }}> {email}</span>.
              The link will expires in 6 hours.</p>
              <p>
                Please follow the instructions on the email to complete your
                profile registration.
              </p>
              </div>
              ) }
              
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

Step7.propTypes = {};

export default Step7;


