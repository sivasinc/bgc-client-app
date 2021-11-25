import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminNavbar from "../components/layout/AdminNavbar";

const AdminAuthRoute = ({
  component: Component,
  userRole,
  authenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true && userRole === "admin" ? (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  userRole: state.user.userInfo.userRole,
});

AdminAuthRoute.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(AdminAuthRoute);
