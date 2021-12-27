import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI Stuff
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import Grid from "@material-ui/core/Grid";
import "./signup.css";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { initialChipData } from "../../util/constant";

import Footer from "./Footer";
import Step4 from "./step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import {
  validateStep4,
  validateStep5,
  validateStep6,
} from "../../util/validators";
import { generateRequest } from "../../util/request";
import { validateInfo } from "./Validate";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const signup = ({ signupUser, history, UI }) => {
  const [chipData, setChipData] = useState(initialChipData);
  const [selectedProfile, setSelectedProfile] = useState("college");
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: false,
    errorMessage: {},
    participatedChapter: "",
    eventsAttended: [],
    disabled: false,
    state: "",
    interestField: [],
    "college-0": "",
    "college-1": "",
    "workforce-0": "",
    "workforce-1": "",
    "workforce-2": "",
    "timeoff-0": "",
    "figureout-0": "",
    startYear: "",
    startMonth: "",
    endMonth: "",
    endYear: "",
    endDateCheckBox: false,
    visibility: "",
  });

  const [progress, setProgress] = useState(0);

  const handleRadioChange = (e) => {
    console.log(e.target.name + ":::" + e.target.value);
    setUserProfile({
      ...userProfile,
      [e.target.name]: e.target.value,
    });
  };
  const handleEndYearChange = (value) => {
    setUserProfile({ ...userProfile, endYear: value });
  };
  const handleStartYearChange = (value) => {
    setUserProfile({ ...userProfile, startYear: value });
  };
  const listToAray = (fullString) => {
    var fullArray = [];

    if (fullString !== undefined) {
      if (fullString.indexOf(",") == -1) {
        fullArray.push(fullString);
      } else {
        fullArray = fullString.split(",");
      }
    }

    return fullArray;
  };

  const handleProfileRadioChange = (event) => {
    setSelectedProfile(event.target.value);
  };
  const formButtonHandler = async (currentStep) => {
    let error1 = {};
    let valid;
    if (currentStep === 1) {
      error1 = validateInfo(userProfile, currentStep);

      // console.log("error", error1);
      if (Object.keys(error1).length > 0) {
        setUserProfile({ ...userProfile, error: true, errorMessage: error1 });
      }
    }
    if (currentStep === 4) {
      ({ error1, valid } = validateStep4(userProfile, selectedProfile));
      if (!valid) {
        setUserProfile({ ...userProfile, error: true, errorMessage: error1 });
      }
    }
    if (currentStep === 5) {
      let connectionArray;
      let likeToLearnArray;
      let interstedItem = chipData
        .filter((x) => x.itemSelected === true)
        .map((y) => y.label);
      userProfile.interestField.push(...interstedItem);
      connectionArray = listToAray(userProfile.connections);
      likeToLearnArray = listToAray(userProfile.likeToLearn);
      setUserProfile({
        ...userProfile,
        interestField: userProfile.interestField,
        connections: connectionArray,
        likeToLearn: likeToLearnArray,
      });
      ({ error1, valid } = validateStep5(userProfile));
      if (!valid) {
        setUserProfile({ ...userProfile, error: true, errorMessage: error1 });
      }
    }
    if (currentStep === 6) {
      ({ error1, valid } = validateStep6(userProfile));
      if (!valid) {
        setUserProfile({ ...userProfile, error: true, errorMessage: error1 });
      }
    }

    if (Object.keys(error1).length === 0) {
      if (currentStep === 6) {
        const request = generateRequest(userProfile, selectedProfile);
        console.log("request", request);
        signupUser(request, history);
      }
      setProgress(currentStep * 20);
      setCurrentStep(currentStep);
    }
  };
  const handleInputChange = (event) => {
    if (event.target.name === "endDateCheckBox") {
      setUserProfile({
        ...userProfile,
        [event.target.name]: event.target.checked,
      });
    } else {
      setUserProfile({
        ...userProfile,
        [event.target.name]: event.target.value,
      });
    }
  };

  const selectChip = (key) => {
    const temp = [...chipData];
    temp.forEach((item) => {
      if (item.key === key) {
        console.log(!item.itemSelected);
        item.itemSelected = !item.itemSelected;
      }
    });
    setChipData([...temp]);
    console.log(chipData);
  };

  const addNewData = () => {
    if (userProfile.tempInterestField.trim().length > 0) {
      const interest = {
        key: chipData.length,
        label: userProfile.tempInterestField,
        itemSelected: true,
      };
      userProfile.tempInterestField = "";
      setChipData((prev) => [...prev, interest]);
      console.log(chipData);
    }
  };
  console.log("userProfile", userProfile);
  const loadCurrentSection = (currentStep) => {
    switch (currentStep) {
      case 0:
        return (
          <Step1
            handleInputChange={handleInputChange}
            userProfile={userProfile}
          />
        );
      case 1:
        return <Step2 />;
      case 2:
        return (
          <Step3
            handleProfileRadioChange={handleProfileRadioChange}
            selectedProfile={selectedProfile}
            userProfile={userProfile}
          />
        );
      case 3:
        return (
          <Step4
            selectedProfile={selectedProfile}
            handleInputChange={handleInputChange}
            userProfile={userProfile}
            handleStartYearChange={handleStartYearChange}
            handleEndYearChange={handleEndYearChange}
            handleRadioChange={handleRadioChange}
          />
        );
      case 4:
        return (
          <Step5
            selectChip={selectChip}
            addNewData={addNewData}
            handleInputChange={handleInputChange}
            userProfile={userProfile}
            chipData={chipData}
          />
        );
      case 5:
        return (
          <Step6
            selectedProfile={selectedProfile}
            handleRadioChange={handleRadioChange}
            userProfile={userProfile}
          />
        );
      default:
        return;
    }
  };
  const { errors } = UI;
  const progressSection = (
    <div className="spinnerDiv">
      <CircularProgress size={200} thickness={2} />
    </div>
  );

  return (
    <Grid container>
      <Grid item md={2} />
      <Grid xs={12} md={8}>
        {currentStep === 6 ? (
          <Step7
            userProfile={userProfile}
            error={UI.errors}
            loading={UI.loading}
          />
        ) : (
          <div className="signUp">
            <div className="signup_header">
              <div className="signupheader__left">
                <img
                  className="signup_header__logo"
                  src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/bgc-logo.svg?alt=media&token=0f61a406-04b2-42a7-98ee-43f4d2183524"
                />
              </div>
              <div className="signup_header__right">
                <p>Alumnae Portal</p>
                <p>Sign-up</p>
              </div>
            </div>

            {/* <div className="signUpHeader">
              <div className="logo_div">
                <img
                  className="img"
                  src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/bgc-logo.svg?alt=media&token=0f61a406-04b2-42a7-98ee-43f4d2183524"
                />
              </div>
              <div className="heading_div">
                <Typography variant="h1">Alumnae Portal</Typography>
                <Typography variant="h3">Sign-up</Typography>
              </div>
            </div> */}

            <div></div>
            <div className="signUp__section">
              {errors && (
                <Typography variant="body2">{errors.general}</Typography>
              )}
              <LinearProgress
                variant="determinate"
                className="progress"
                value={progress}
              />
              {loadCurrentSection(currentStep)}
              <Footer
                currentStep={currentStep}
                formButtonHandler={formButtonHandler}
                disabled={currentStep === 3 ? userProfile.disabled : false}
              />
            </div>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

signup.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapDispatchToProps = { signupUser };

export default connect(mapStateToProps, mapDispatchToProps)(signup);
