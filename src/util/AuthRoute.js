import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MemberNavbar from '../components/layout/Navigation';


const AuthRoute = ({ component: Component, userRole, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true && userRole === 'member' ? (
        <React.Fragment>
          <MemberNavbar />
          <Component {...props} />
        </React.Fragment>
      ) : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  userRole: state.user.userInfo.userRole
});

AuthRoute.propTypes = {
  user: PropTypes.object
};

export default connect(mapStateToProps)(AuthRoute);
