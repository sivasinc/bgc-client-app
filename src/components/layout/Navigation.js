import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { AppBar, IconButton } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@material-ui/core/Typography";
import BGCProfileHome from "../UserProfile/BGCProfileHome";
import { logoutUser, updateTabIndex } from "../../redux/actions/userActions";
import { getRoutes } from "../../util/constant";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import AdminNavbar from "../layout/AdminNavbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";

import "./Navigation.css";

const Navigation = ({
  user,
  logoutUser,
  authenticated,
  currentTabIndex,
  updateTabIndex,
  userRole,
}) => {
  const [value, setValue] = useState(3);
  const [openDrawer, setDrawer] = useState(false);
  const [tabName, setTabName] = useState("Alumnae Portal Home");
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { firstName, lastName } = user.userInfo;

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      setOpen(!open);
    } else {
      setAnchorEl(event.currentTarget);
      setOpen(!open);
    }
  };
  const handleForgotPassword = () => {
    setAnchorEl(null);
    setOpen(false);
    history.push("/recover");
  };
  const handleClickaway = () => {
    setOpen(false);
    setAnchorEl(null);
  };

  console.log("currentTabIndex", currentTabIndex);
  useEffect(() => {
    if (authenticated) {
      switch (currentTabIndex) {
        case 0:
          history.push("/portalHome");
          setTabName("Alumnae Portal Home");
          break;
        case 1:
          // Needs to change later
          history.push("/userprofile");
          setTabName("My Profile");
          break;
        case 2:
          history.push("/communityHome");
          setTabName("Communities");
          break;
        case 3:
          history.push("/directory");
          setTabName("Directory");
          break;
        case 4:
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
  const handleLogOut = () => {
    setAnchorEl(null);
    setOpen(false);
    history.push("/login");
    logoutUser();
  };

  const handleMenuChange = (event, newValue) => {
    updateTabIndex(newValue);
    console.log(newValue);
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
    <div className="main_header">
      <img
        className="header__img"
        src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/BGC-Logo.png?alt=media&token=ba7c24c2-d25e-467f-91fa-d57c69fe5c0b"
        alt=""
      />
      <Tabs
        className="menu_bar"
        value={currentTabIndex}
        onChange={handleMenuChange}
        aria-label="menu bar"
        TabIndicatorProps={
          currentTabIndex !== 4
            ? { style: { background: "white" } }
            : {
                style: {
                  display: "none",
                },
              }
        }
      >
        <Tab
          label="Alumnae Portal Home"
          name="home"
          className="header__bar_item"
          // {...a11yProps(0)}
        />
        <Tab
          label="My Profile"
          name="profile"
          className="header__bar_item"
          // {...a11yProps(1)}
        />
        <Tab
          label="Communities"
          name="community"
          className="header__bar_item"
          // {...a11yProps(2)}
        />
        <Tab
          label="Directory"
          name="directory"
          className="header__bar_item"
          // {...a11yProps(3)}
        />

        <Tab
          name="userProfile"
          className="header__bar_item"
          onClick={handleClick}
          label={
            <div className="label_content">
              {firstName} {lastName} <ArrowDropDownIcon />
            </div>
          }
        ></Tab>
      </Tabs>
      <div>
        <Popper
          id={open ? "simple-popper" : null}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          transition
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={handleClickaway}>
              <Fade {...TransitionProps} timeout={350}>
                <Paper className="paper_content">
                  <MenuItem onClick={handleForgotPassword}>
                    <Typography variant="p">Change Password</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    <Typography variant="p">Log Out</Typography>
                  </MenuItem>
                </Paper>
              </Fade>
            </ClickAwayListener>
          )}
        </Popper>
      </div>
    </div>
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
            value={0}
            className="header__bar_item"
          />
          <Tab
            label="My Profile"
            name="profile"
            className="header__bar_item"
            value={1}
          />
          <Tab
            label="Communities"
            name="community"
            value={2}
            className="header__bar_item"
          />
          <Tab
            label="Directory"
            name="directory"
            value={3}
            className="header__bar_item"
          />
          <Tab
            label="Change Password"
            name="logout"
            value={4}
            className="header__item_sm"
            onClick={handleForgotPassword}
          />
          <Tab
            label="Log out"
            name="logout"
            value={5}
            className="header__bar_item"
            onClick={handleLogOut}
          />
        </Tabs>
      </div>
    </Drawer>
  );
  const memberNavbar = (
    <AppBar position="static" className="header__bar">
      {authenticated ? authenticatedMenuItems : unAuthenticatedMenuItems}
    </AppBar>
  );
  const mediumSize =
    userRole === "admin" ? <AdminNavbar /> : <div>{memberNavbar}</div>;
  const authenticatedSmMenu = (
    <React.Fragment>
      <div className="header_sm">
        <img
          className="header__img_sm"
          src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/BGC-Logo.png?alt=media&token=ba7c24c2-d25e-467f-91fa-d57c69fe5c0b"
          alt=""
        />
        <h5 className="heading_sm">{tabName}</h5>

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
  userRole: state.user.userInfo.userRole,
});

const mapDispatchToProps = { logoutUser, updateTabIndex };
Navigation.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
