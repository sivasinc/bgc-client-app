import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Community from '../components/community/Community';
import Profile from '../components/profile/Profile';
import NetWorkProfile from '../components/profile/NetWorkProfile';
import UserProfileTile from '../components/profile/UserProfileTile';
import ScreamSkeleton from '../util/ScreamSkeleton';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import GridItem from '../components/Grid/GridItem';
import GridContainer from '../components/Grid/GridContainer'
import Card from '../components/Card/Card';
import CardHeader from '../components/Card/CardHeader.js';
import CardBody from '../components/Card/CardBody';
import CardFooter from '../components/Card/CardFooter';

import { connect } from 'react-redux';
import { getAllCommunity, setCurrentPage, getAllUsers } from '../redux/actions/dataActions';

const styles = {
  pageTitle: {
    margin: '10px auto 10px auto',
    color: 'rgb(21 169 156 / 87%)'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "18px",
  },
};

class CommunityHome extends Component {
  componentDidMount() {
    console.log('communityHomeProps', this.props);
    this.props.getAllCommunity();
    this.props.getAllUsers();
    this.props.setCurrentPage('COMMUNITY');
  }
  componentDidUpdate() {
    const {isRefreshPost} = this.props.data;
    if(isRefreshPost) {
      this.props.getAllCommunity();
      this.props.setCurrentPage('COMMUNITY');
    }
    console.log('PostHome-componentDidUpdate', this.props);
    console.log('communityHomeProps-CommunityHome', this.props);
  }
  render() {
    const { communities, loading } = this.props.data;
    const {classes, user : { users, credentials: { handle, createdAt, imageUrl, bio, website, location } } } = this.props;
    let recentCommunityMarkup = !loading ? (
      communities.map((community) => <Community key={community.communityId} community={community} />)
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    );
    let myNetworkMarkup = !loading ? (
      users.map((user) => {
        if(handle !== user.name) {
          return <NetWorkProfile currentUser= {user} />
        }
      })
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    );
    return (
      <React.Fragment>

<GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Top Communities</h4>
            </CardHeader>
            <CardBody>
            {recentCommunityMarkup}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>User Profile</h4>
            </CardHeader>
            <CardBody>
            <UserProfileTile />
            </CardBody>
          </Card>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>My Networks</h4>
            </CardHeader>
            <CardBody>
            {myNetworkMarkup}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
  </GridContainer>
          {/* <Grid container spacing={16}>
         
         <Grid item sm={8} xs={12}>
           {recentCommunityMarkup}
         </Grid>
         <Grid item sm={4} xs={12}>
           <Profile />
         </Grid>
       </Grid> */}
      </React.Fragment>
    );
  }
}

CommunityHome.propTypes = {
  getAllCommunity: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data,
  user : state.user
});

export default connect(
  mapStateToProps,
  { getAllCommunity, setCurrentPage, getAllUsers }
)(withStyles(styles)(CommunityHome));
