import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppIcon from '../../images/bgc.png';
import CircularProgress from "@material-ui/core/CircularProgress";

// MUI Stuff
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import "./signup.css";
import Step1 from './step1'
import Step2 from "./step2";
import Step3 from "./step3";
import {
  initialValue,
  profileQuestionsInit,
  initialChipData,
} from "../../util/constant";
import Footer from "./Footer";
import Step4 from "./step4";
import Step5 from "./Step5";
import Step6 from "./step6";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import { generateRequest } from "../../util/request";
import validate from "./Validate";

const signup = ({ signupUser, history, UI }) => {
  const [securityQuestions, setSecurityQuestions] = useState(initialValue);
  const [profileQuestions, setProfileQuestions] =
    useState(profileQuestionsInit);
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
  });

  const [progress, setProgress] = useState(0);

  const handleSelectChange = (event,index) => {
    const tempItems = [...securityQuestions];
    tempItems.forEach((item, index) => {
      if (item.id === event.target.id) {
        item.selectedItem = event.target.value;
        item.selectedItemValue = "";
      }
      if (item.id !== event.target.id) {
        item.answerOptions = item.answerOptions.filter(
          (x) => x.name !== event.target.value
        );
      }
    });

    setSecurityQuestions([...tempItems]);
  };

  const handleProfileRadioChange = (event) => {
    setSelectedProfile(event.target.value);
  };
  const formButtonHandler = (currentStep) => {
    let error1 = {};
    if (currentStep === 1) {
      error1 = validate(userProfile);
      console.log("error", error1);
      if (Object.keys(error1).length > 0) {
        setUserProfile({ ...userProfile, error: true, errorMessage: error1 });
      }
    }

    if (currentStep === 5) {
      let interstedItem = chipData
        .filter((x) => x.itemSelected === true)
        .map((y) => y.label);

      setUserProfile({ ...userProfile, interestField: interstedItem });
    }

    if (Object.keys(error1).length === 0) {
      if (currentStep === 6) {
        const request = generateRequest(
          userProfile,
          selectedProfile,
        );
        signupUser(request, history);
      }
      setProgress(currentStep * 20);
      setCurrentStep(currentStep);
    }
  };
  const handleInputChange = (event) => {
    setUserProfile({ ...userProfile, [event.target.name]: event.target.value });
  };
  const handleSecurityInputChange = (event) => {
    const tempItems = [...securityQuestions];
    tempItems.forEach((item) => {
      if (item.id === event.target.name) {
        item.selectedItemValue = event.target.value;
      }
    });
    setSecurityQuestions([...tempItems]);
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
            handleSelectChange={handleSelectChange}
            securityQuestions={securityQuestions}
            handleInputChange={handleInputChange}
            userProfile={userProfile}
            handleSecurityInputChange={handleSecurityInputChange}
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
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        {currentStep === 6 ? (
          progressSection
        ) : (
          <div className="signUp">
            
            <div className="signUpHeader">
            <div className="logo_div">
              <img src={AppIcon} alt="monkey" className="img"></img>
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
                style={{color: "red"}} 
                variant="determinate"
                className="progress"
                value={progress}
              />
              {loadCurrentSection(currentStep)}
              <Footer
                currentStep={currentStep}
                formButtonHandler={formButtonHandler}
              />
            </div>
          </div>
        )}
      </GridItem>
    </GridContainer>
  );
};

signup.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapDispatchToProps = { signupUser };

export default connect(mapStateToProps, mapDispatchToProps)(signup);