import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import CreateContainer from "../community/CreateContainer";
import Notifications from "./Notifications";
import UserProfile from "./UserProfile";
import { withStyles } from "@material-ui/core/styles";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import HomeIcon from "@material-ui/icons/Home";
import { logoutUser } from "../../redux/actions/userActions";
import "./Navbar.css";

const StyledAppBar = withStyles({
  root: {
    background: "#292727",
    border: 0,
    color: "white",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgb(35 27 28 / 30%)",
  },
  label: {
    textTransform: "capitalize",
  },
  button: {
    "&.active": {
      background: "black",
    },
  },
})(AppBar);

const hoverStyle = {
  borderBottom: '5px solid white',
  borderRadius: '0',
  textTransform: 'inherit',
  padding: '20px 0 10px 0',
  fontSize: '1rem'
}
class Navbar extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  state = {
    hover : false,
  }

  setHover = (value) => {
    this.setState({ hover : value});
  }
  preventDefault = (event) => event.preventDefault();
  render() {
    const { authenticated } = this.props;
    return (
      <StyledAppBar color="primary">
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
             <Link to="/communityHome">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Button color="inherit" component={NavLink} to="/communityHome">
                Login
              </Button>
              <Notifications />
              <UserProfile />
            </Fragment>
          ) : (
            <Fragment>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </StyledAppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
const mapActionsToProps = { logoutUser };

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
