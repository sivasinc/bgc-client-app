import React, { useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI Stuff
import LinearProgress from '@mui/material/LinearProgress';
import Typography from "@material-ui/core/Typography";
// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import Grid from "@material-ui/core/Grid";
import "./signup.css";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import {
  initialChipData,
} from "../../util/constant";
import Footer from "./Footer";
import Step4 from "./step4";
import Step5 from "./Step5";
import Step6 from "./step6";
import Step7 from "./Step7";
import { generateRequest } from "../../util/request";
import validate from "./Validate";

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
  });

  const [progress, setProgress] = useState(0);

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
  const formButtonHandler = (currentStep) => {
    let error1 = {};
    if (currentStep === 1) {
      error1 = validate(userProfile, currentStep);
      console.log("error", error1);
      if (Object.keys(error1).length > 0) {
        setUserProfile({ ...userProfile, error: true, errorMessage: error1 });
      }
    }

    if (currentStep === 5) {
      let connectionArray;
      let likeToLearnArray;
      let interstedItem = chipData
        .filter((x) => x.itemSelected === true)
        .map((y) => y.label);
      connectionArray = listToAray(userProfile.connections);
      likeToLearnArray = listToAray(userProfile.likeToLearn);

      setUserProfile({
        ...userProfile,
        interestField: interstedItem,
        connections: connectionArray,
        likeToLearn: likeToLearnArray,
      });
    }

    if (Object.keys(error1).length === 0) {
      if (currentStep === 6) {
        const request = generateRequest(userProfile, selectedProfile);
        console.log(request);
        signupUser(request, history);
      }
      setProgress(currentStep * 20);
      setCurrentStep(currentStep);
    }
  };
  const handleInputChange = (event) => {
    setUserProfile({ ...userProfile, [event.target.name]: event.target.value });
    if (currentStep === 3) {
      userProfile.disabled = validate(
        userProfile,
        currentStep,
        selectedProfile
      ).disabled;
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
    const interest = {
      key: chipData.length,
      label: userProfile.interestField,
      itemSelected: true,
    };
    setChipData((prev) => [...prev, interest]);
    console.log(chipData);
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
            handleInputChange={handleInputChange}
            userProfile={userProfile}
          />
        );
      case 6:
          return (
            <Step7
              userProfile={userProfile}
            />
          );  
      default:
        return;
    }
  };
  const { errors, loading } = UI;
  const progressSection = (
    <div className="spinnerDiv">
      <CircularProgress size={200} thickness={2} />
    </div>
  );

  return (
    <Grid container>
      <Grid item md={2} />
      <Grid xs={12} md={8}>
        { loading  ? (
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
                <h3>Sign-up</h3>
              </div>
            </div>
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
              {currentStep !== 6 &&  <Footer
                currentStep={currentStep}
                formButtonHandler={formButtonHandler}
                disabled={currentStep === 3 ? userProfile.disabled : false}
              /> }
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