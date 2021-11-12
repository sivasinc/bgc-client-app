import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import BGCProfileHome from "../UserProfile/BGCProfileHome";
import { logoutUser, updateTabIndex } from "../../redux/actions/userActions";
import { getRoutes } from "../../util/constant";

import "./Navigation.css";
import { Box } from "@mui/system";
import { Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@material-ui/icons/Menu'

const AdminNavbar = ({ logoutUser, userInfo, authenticated, currentTabIndex, updateTabIndex }) => {
  const { firstName, lastName } = userInfo

  const a11yProps = (index) => {
    return {
      id: `menu-tab-${index}`,
      "aria-controls": `menu-tabpanel-${index}`,
    };
  };



  return (
    <AppBar position="static" className="header__bar">
      <Tabs variant='fullWidth' aria-label="menu bar">
        <img
          className="header__img"
          src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/BGC-Logo.png?alt=media&token=ba7c24c2-d25e-467f-91fa-d57c69fe5c0b"
          alt=""
        />
        <Tab
          label="Alumnae Portal Admin"
          name="home"
          className="header__bar_item"
          {...a11yProps(1)}
        />
        <Tab
          label=""
          name="home"
          disabled
          className="header__bar_item"
          {...a11yProps(1)}
        />
        <Tab
          label=""
          name="home"
          disabled
          className="header__bar_item"
          {...a11yProps(1)}
        />
        <Tab
          label=""
          name="home"
          disabled
          className="header__bar_item"
          {...a11yProps(1)}
        />
        <Tab
          label={`${firstName} ${lastName}`}
          className="header__bar_item"
          {...a11yProps(2)}
        />
      </Tabs>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  userInfo: state.user.userInfo,
  UI: state.UI,
  authenticated: state.user.authenticated,
  currentTabIndex: state.UI.currentTabIndex
});

const mapDispatchToProps = { logoutUser, updateTabIndex };

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
