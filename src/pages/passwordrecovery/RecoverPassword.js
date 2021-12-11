import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from '@mui/material/LinearProgress';
import "./recoverPassword.css";
import { db, auth } from "../../firebase";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { connect } from "react-redux";

const RecoverPassword = ({ user, authenticated }) => {
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(50);
  const [currentStep, setCurrentStep] = useState(0);
  const [securityDetails, setSecurityDetails] = useState([]);
  const [securityAnswers, setSecurityAnswers] = useState({});
  const [disableProceed, setDisableProceed] = useState(false);
  const [emailValidationMessage, setEmailValidationMessage] = useState("");
  const history = useHistory();
  const { email: userEmail } = user.userInfo;

  useEffect(() => {
    if (authenticated) {
      setEmail(userEmail);
    }
  });

  const recoveryHandler = async (newCount) => {
    if (newCount === 1) {
      const docRef = doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        try {
          const result = await sendPasswordResetEmail(auth, email, {
            url: "https://bgc-functions.web.app/login",
          });
          console.log('result', result);
          setCurrentStep(newCount);
          setProgress(100)
        } catch (error) {
          console.log("password reset error", error);
        }
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setDisableProceed(true);
        setEmailValidationMessage("Please use the registered email address");
      }
    } else {
      setCurrentStep(newCount);
      setProgress(50)
    }
  };
  const loadSection = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1
          email={authenticated ? userEmail : null}
            setEmail={setEmail}
            emailValidationMessage={emailValidationMessage}
          />
        );
      case 1:
        return <Step2 email={email} />;
      default:
        return <Step1 setEmail={setEmail} />;
    }
  };
  if(currentStep < 0) {
    history.push('/login');
  }
  return (
    <Grid container>
      <Grid item md={2}/>
      <Grid item xs={12} md={8}>
        <div className="recovery_header">
          <div className="recovery_header__left">
          <img className ="recovery_header__logo" src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/bgc-logo.svg?alt=media&token=0f61a406-04b2-42a7-98ee-43f4d2183524" />
          </div>
          <div className="recovery_header__right">
            <p>Alumnae Portal</p>
            <p>{authenticated ? "Change Password" : "Password Recovery"}</p>
          </div>
        </div>
      </Grid>
      <Grid item md={2}/>
      <Grid item md={2}/>
      <Grid item xs={12} md={8}>
        <div className="recovery_block">
          <div className="recovery_block_content">
            <LinearProgress
              variant="determinate"
              className="progress"
              value={progress}
            />

            {loadSection()}
            { currentStep !== 1 && (<div className="recovery_block__footer">
              <div>
                {" "}
                {!authenticated &&<Button
                  variant="outlined"
                  color="primary"
                  className="footer_back__button"
                  onClick={() => recoveryHandler(currentStep - 1)}
                >
                  {currentStep === 2 ? 'Go Back' : 'Return to login'}
                </Button>}
              </div>
              <div>
                <Button
                  disabled={disableProceed}
                  variant="contained"
                  className="footer_continue__button"
                  color="primary"
                  onClick={() => recoveryHandler(currentStep + 1)}
                >
                  Continue
                </Button>
              </div>
            </div>) }
          </div>
        </div>
      </Grid>
      <Grid item md={2}/>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  authenticated: state.user.authenticated,
});
const mapDispatchToProps = {};
RecoverPassword.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);

