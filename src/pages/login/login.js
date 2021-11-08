import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@mui/material/CssBaseline';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// MUI Stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import './login.css';

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    console.log('email', this.state.email);
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <React.Fragment>
      <Grid container>

<Grid item md={2}/>
      <Grid item xs={12} md={8}>
        <div className="login_header">
          <div className="login_header__left">
          <img className ="login_header__logo" src="https://firebasestorage.googleapis.com/v0/b/bgc-functions.appspot.com/o/bgc-logo.svg?alt=media&token=0f61a406-04b2-42a7-98ee-43f4d2183524" />
          </div>
          <div className="login_header__right">
            <p>Alumnae Portal</p>
            <p>Log in</p>
          </div>
        </div>
      </Grid>
      <Grid item md={2}/>
      <Grid item md={2}/>
      <Grid item xs={12} md={8}>
      <div className="login_block">
          <p>Welcome back!</p>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField
            label="Email Address"
            id="email"
            name="email"
            className="login_block_text"
            helperText={errors.email}
            error={errors.email ? true : false}
            value={this.state.email}
            onChange={this.handleChange}
            fullWidth
          />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="login_button"
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={8} />
              )}
            </Button>
            <br />
            <p className="forgotPassword__link"><Link to="/recover">Forgot password</Link></p>
            <br />
            <p className="signup_link">
              Don't have an account ? sign up <Link to="/signup">here</Link>
            </p>
            Admin? <Link to="/admin-signup">here</Link>
          </form>
          </div>
        </Grid>
        <Grid item md={2}/>
      </Grid>
      </React.Fragment>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(login);
