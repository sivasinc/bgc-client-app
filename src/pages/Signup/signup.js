import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


// MUI Stuff
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import "./signup.css";
import step1 from "./step1";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { initialValue, profileQuestionsInit } from "../../util/constant";
import Footer from "./Footer";
import Step4 from "./step4";
import Step5 from "./Step5";
import GridItem from '../../components/Grid/GridItem';
import GridContainer from '../../components/Grid/GridContainer'
import { generateRequest } from "../../util/request";

const signup = ({signupUser, history, UI }) => {
  const [securityQuestions, setSecurityQuestions] = useState(initialValue);
  const [profileQuestions, setProfileQuestions] = useState(profileQuestionsInit);
  const [selectedProfile, setSelectedProfile] = useState('college');
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState({})

  const [progress, setProgress] = useState(0);

  const handleSelectChange = (event) => {
    const tempItems = [...securityQuestions];
    tempItems.forEach((item) => {
      if(item.id === event.target.name) {
        item.selectedItem = event.target.value
      }
    });
    setSecurityQuestions([...tempItems]);
  }

  const handleProfileRadioChange = (event) => {
    setSelectedProfile(event.target.value)
  }
  const formButtonHandler = (currentStep) => {
      if(currentStep === 5) {
        const request = generateRequest(userProfile,selectedProfile, securityQuestions);
        signupUser(request, history);
      }
      setProgress(currentStep * 25)
      setCurrentStep(currentStep);
  }
  const handleInputChange = (event) => {
    setUserProfile({...userProfile, [event.target.name] : event.target.value, });
  }
  const handleSecurityInputChange = (event) => {
    const tempItems = [...securityQuestions];
    tempItems.forEach((item) => {
      if(item.id === event.target.name) {
        item.selectedItemValue = event.target.value
      }
    });
    setSecurityQuestions([...tempItems]);
  }
console.log('userProfile', userProfile);
  const loadCurrentSection = (currentStep) => {
      switch (currentStep) {
        case 0:
          return (<Step1 handleSelectChange= {handleSelectChange}
          securityQuestions={securityQuestions} handleInputChange={handleInputChange} userProfile={userProfile} 
          handleSecurityInputChange={handleSecurityInputChange} />);
        case 1:
          return <Step2 />
        case 2:
            return <Step3 handleProfileRadioChange= {handleProfileRadioChange} selectedProfile={selectedProfile} 
            userProfile={userProfile}/>
        case 3:
              return <Step4 selectedProfile={selectedProfile} handleInputChange={handleInputChange} userProfile={userProfile} />    
        case 4:
            return <Step5 selectedProfile={selectedProfile} handleInputChange={handleInputChange} userProfile={userProfile} />    
        default:
          return;
      }
  }
  const { errors } = UI;
  const progressSection = (<div className="spinnerDiv">
  <CircularProgress size={200} thickness={2} />
</div>);

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          {currentStep === 5 ? progressSection: (<div className="signUp">
      <div className="signUpHeader">
        <h1>Alumnae Portal Signup</h1>
      </div>
      <div>
      </div>
      <div className="signUp__section">
      {errors && (
              <Typography variant="body2">
                {errors.general}
              </Typography>
            )}
        <LinearProgress variant="determinate" className="progress" value={progress} />
          {loadCurrentSection(currentStep)}
        <Footer  currentStep= {currentStep} formButtonHandler= {formButtonHandler} />
      </div>
    </div>)}
        
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
