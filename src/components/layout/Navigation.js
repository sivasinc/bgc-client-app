import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import BGCProfileHome from "../UserProfile/BGCProfileHome";
import { logoutUser } from "../../redux/actions/userActions";
import { getRoutes } from "../../util/constant";

import "./Navigation.css";

const Navigation = ({ UI, logoutUser, authenticated }) => {
  const [value, setValue] = useState(3);
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      switch (value) {
        case 0:
        case 1:
          // Needs to change later
          history.push("/userprofile");
          break;
        case 2:
          history.push("/userprofile");
          break;
        case 3:
          history.push("/communityHome");
          break;
        default:
          history.push("/login");
          setValue(2);
          logoutUser();
          break;
      }
    }
    if (!authenticated) {
      switch (value) {
        case 0:
        case 1:
          history.push("/login");
          break;
        case 2:
          history.push("/signup");
          break;
        default:
          history.push("/login");
      }
    }
  }, [value]);

  const handleMenuChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `menu-tab-${index}`,
      "aria-controls": `menu-tabpanel-${index}`,
    };
  };
  console.log('value', value);
  const authenticatedMenuItems = (
    <Tabs value={value} onChange={handleMenuChange} aria-label="menu bar">
      <img
        className="header__img"
        src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/BGC-Logo.png?alt=media&token=ba7c24c2-d25e-467f-91fa-d57c69fe5c0b"
        alt=""
      />
      <Tab
        label="Alumnae Portal Home"
        name="home"
        className="header__bar_item"
        {...a11yProps(1)}
      />
      <Tab
        label="My Profile"
        name="profile"
        className="header__bar_item"
        {...a11yProps(2)}
      />
      <Tab
        label="Communities"
        name="community"
        className="header__bar_item"
        {...a11yProps(3)}
      />
      <Tab
        label="Directory"
        name="directory"
        className="header__bar_item"
        {...a11yProps(4)}
      />
      <Tab
        label="Log out"
        name="logout"
        className="header__bar_item"
        {...a11yProps(5)}
      />
    </Tabs>
  );
  const unAuthenticatedMenuItems = (
    <Tabs
      value={value}
      onChange={handleMenuChange}
      aria-label="menu bar"
    >
      <img
        className="header__img"
        src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/Screen%20Shot%202021-09-06%20at%207.17.04%20PM.png?alt=media&token=089a0496-afdc-4654-b96a-cb440c316758"
        alt=""
      />
      <Tab label="Log in" name="login" className="header__bar_item" {...a11yProps(0)} />
      <Tab label="Sign up" name="logout" className="header__bar_item" {...a11yProps(1)}/>
    </Tabs>
  );
  return (
    <div className="header__app">
      <AppBar position="static" className="header__bar">
        {authenticated ? authenticatedMenuItems : unAuthenticatedMenuItems}
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = { logoutUser };
Navigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
