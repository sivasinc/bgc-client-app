import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream';
import ParentContainer from '../components/Comments/ParentContainer';
import CommunityProfile from '../components/profile/CommunityProfile';
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
import { getPostsOfCommunity, setCurrentPage } from '../redux/actions/dataActions';

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
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    fontSize: "18px",
  }
};
class PostHome extends Component {
  componentDidMount() {
    console.log('PostHomeProps', this.props);
    const communityId = this.props.match.params.communityId
    this.props.getPostsOfCommunity(communityId);
    this.props.setCurrentPage('POST');
  }
  componentDidUpdate() {
    const communityId = this.props.match.params.communityId
    const {isRefreshPost} = this.props.data;
    if(isRefreshPost) {
       this.props.getPostsOfCommunity(communityId);
       this.props.setCurrentPage('POST');
    }
    console.log('PostHome-componentDidUpdate', this.props);
  }
  render() {
    const { communityPosts, communityPosts: { screams }, loading } = this.props.data;
    const {classes } = this.props;
    console.log('screams', screams);
    let recentScreamsMarkup = null;
    if(loading) {
      recentScreamsMarkup = (<div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>);
    } else {
      recentScreamsMarkup = Object.keys(communityPosts).length > 0 && Array.isArray(screams) && screams.length > 0 ? (
        screams.map((scream) => <ParentContainer key={scream.screamId} scream={scream} />)
      ) : (
        <Typography variant="h5" className={classes.pageTitle}>
              No Post Exists
            </Typography>
      );
    }
    
    return (
      <React.Fragment>
<GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Community Posts</h4>
            </CardHeader>
            <CardBody>
            {recentScreamsMarkup}
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>About Community</h4>
            </CardHeader>
            <CardBody>
            <CommunityProfile />
            </CardBody>
            <CardFooter></CardFooter>
          </Card>
        </GridItem>
  </GridContainer>
      </React.Fragment>
    );
  }
}

PostHome.propTypes = {
  getPostsOfCommunity: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getPostsOfCommunity, setCurrentPage }
)(withStyles(styles)(PostHome));
