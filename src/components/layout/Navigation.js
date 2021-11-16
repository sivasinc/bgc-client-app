import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { AppBar, IconButton } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@material-ui/core/Typography";
import BGCProfileHome from "../UserProfile/BGCProfileHome";
import { logoutUser, updateTabIndex } from "../../redux/actions/userActions";
import { getRoutes } from "../../util/constant";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";

import "./Navigation.css";

const Navigation = ({
  logoutUser,
  authenticated,
  currentTabIndex,
  updateTabIndex,
}) => {
  const [value, setValue] = useState(3);
  const [openDrawer, setDrawer] = useState(false);
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  console.log("currentTabIndex", currentTabIndex);
  useEffect(() => {
    if (authenticated) {
      switch (currentTabIndex) {
        case 0:
        case 1:
          // Needs to change later
          history.push("/portalHome");
          break;
        case 2:
          history.push("/userprofile");
          break;
        case 3:
          history.push("/communityHome");
          break;
        case 4:
          history.push("/directory");
          break;
        default:
          history.push("/login");
          setValue(2);
          logoutUser();
          break;
      }
    }
    if (!authenticated) {
      switch (currentTabIndex) {
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
  }, [currentTabIndex]);

  const handleMenuChange = (event, newValue) => {
    updateTabIndex(newValue);
    console.log(matches);
    setDrawer(false);
  };
  const a11yProps = (index) => {
    return {
      id: `menu-tab-${index}`,
      "aria-controls": `menu-tabpanel-${index}`,
    };
  };
  console.log("value", matches);
  const authenticatedMenuItems = (
    <Tabs
      value={currentTabIndex}
      onChange={handleMenuChange}
      aria-label="menu bar"
    >
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
    <Tabs value={value} onChange={handleMenuChange} aria-label="menu bar">
      <img
        className="header__img"
        src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/Screen%20Shot%202021-09-06%20at%207.17.04%20PM.png?alt=media&token=089a0496-afdc-4654-b96a-cb440c316758"
        alt=""
      />
      <Tab
        label="BlackGirlsCode.com"
        name="bgc"
        className="header__bar_item"
        {...a11yProps(0)}
      />
    </Tabs>
  );
  const drawerPage = (
    <Drawer
      open={openDrawer}
      classes={{ paper: "responsive_header_sm" }}
      openSecondary={true}
      docked={true}
    >
      <button
        className="drawer_close_button"
        onClick={() => setDrawer(!openDrawer)}
      >
        X
      </button>
      <div>
        <Tabs
          orientation="vertical"
          value={currentTabIndex}
          onChange={handleMenuChange}
          aria-label="menu bar"
          classes={{ flexContainer: "vertical_items" }}
          TabIndicatorProps={{
            style: {
              display: "none",
            },
          }}
        >
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
            label="Change Password"
            name="logout"
            className="header__item_sm"
            {...a11yProps(5)}
          />
          <Tab
            label="Log out"
            name="logout"
            className="header__bar_item"
            {...a11yProps(5)}
          />
        </Tabs>
      </div>
    </Drawer>
  );
  const mediumSize = (
    <AppBar position="static" className="header__bar">
      {authenticated ? authenticatedMenuItems : unAuthenticatedMenuItems}
    </AppBar>
  );
  const authenticatedSmMenu = (
    <React.Fragment>
      <div className="header_sm">
        <img
          className="header__img_sm"
          src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/BGC-Logo.png?alt=media&token=ba7c24c2-d25e-467f-91fa-d57c69fe5c0b"
          alt=""
        />
        <h5 className="heading_sm">Alumnae Portal Home</h5>

        <IconButton
          className="header_right"
          edge="start"
          onClick={() => setDrawer(!openDrawer)}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </div>
    </React.Fragment>
  );
  const unAuthenticatedSmMenu = (
    <div className="unAuth_sm_header">
      <h5>BlackGirlsCode.com</h5>
    </div>
  );
  const responsiveSize = (
    <AppBar position="static" className="header__bar">
      {authenticated ? authenticatedSmMenu : unAuthenticatedSmMenu}
    </AppBar>
  );
  return (
    <div className="header__app">
      {openDrawer && drawerPage}
      {!matches ? mediumSize : responsiveSize}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
  authenticated: state.user.authenticated,
  currentTabIndex: state.UI.currentTabIndex,
});

const mapDispatchToProps = { logoutUser, updateTabIndex };
Navigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
