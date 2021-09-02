import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';


// MUI Stuff


// Redux stuff
import { connect } from "react-redux";
import { signupUser } from "../../redux/actions/userActions";
import GridItem from "../Grid/GridItem";
import GridContainer from "../Grid/GridContainer";
import "./BGCProfileHome.css";
import MyButton from "../../util/MyButton";
import ProfileHeader from "./ProfileHeader";
import Education from "./Education";
import Experience from "./Experience";
import Summary from "./Summary";
import MyNetworks from "./MyNetworks";
import MyCommunities from "./MyCommunities";

const BGCProfileHome = ({ history, UI, user }) => {
  const { credentials } = user;
  console.log('UI-States', credentials);

  const progressSection = (<div className="spinnerDiv">
  <CircularProgress size={200} thickness={2} />
</div>);
  return (
    <React.Fragment>
      {!Object.keys(credentials) > 0 ? progressSection: (<div className="bgc__profile__Container">
      <div className="bgc__profile_Container__header">
      <ProfileHeader credentials={credentials} />
      </div>
      <div className="bgc__profile_Container__body">
      <div className="bgc__profile_Container__body__midPanel">
      <Summary />
      <Experience />
      <Education />
      </div>
      <div className="bgc__profile_Container__body__rightPanel">
     <MyNetworks />
     <MyCommunities />
      </div>
      </div>
    </div>)}
    </React.Fragment>);
   
    // </GridContainer>
};

BGCProfileHome.propTypes = {};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
const mapDispatchToProps = { signupUser };

export default connect(mapStateToProps, mapDispatchToProps)(BGCProfileHome);
