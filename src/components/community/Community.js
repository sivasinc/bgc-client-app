import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
// MUI Stuff
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import CalendarToday from "@material-ui/icons/CalendarToday";
import postHome from "../../pages/postHome";
import { getPostJoinCommunity } from '../../redux/actions/dataActions';

// Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";


const styles = (theme) => ({
  ...theme,
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  heading: {
    color: "#00bcd4",
  },
  spanStyle: {
    verticalAlign: 'middle'
  }
});

class Community extends Component {
  state = {
    open: false,
  };
  communityJoinHandler = () => {
    const {
      community: { communityId, members },
      user: {
        credentials: { handle }
      },
    } = this.props;
    console.log("clicked");
    const memberArray = [...members];
    memberArray.push(handle);
    const communityMemberRequest = {
      members : [...memberArray],
      communityId,
    }
    this.props.getPostJoinCommunity(communityMemberRequest);
    // return <Redirect to={`/community/posts/${communityId}`}/>;
    // this.setState( {open : true });
    //
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      community: { description, createdAt, image, members, name, communityId },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;
    const { open } = this.state;
    console.log('members', members);
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardMedia
            image={image}
            title="Profile image"
            className={classes.image}
          />
          <CardContent className={classes.content}>
            <Typography
              variant="h5"
              component={ members.includes(handle) ?  Link: 'label'}
              to={`/community/posts/${communityId}`}
              onClick={this.clickHandler}
              color="primary"
            >
              {name}
            </Typography>
            <Typography variant="body">{description}</Typography>
            <hr />
            <CalendarToday className={classes.spanStyle} color="primary" />{' '}
              <span className={classes.spanStyle}>
                Created {dayjs(createdAt).format("MMM YYYY")}
              </span>
              <hr />
              <Typography variant="body">1.2K Members</Typography>
            {!members.includes(handle) && (<React.Fragment><span className={classes.heading}>
              Would you like to join this community?{" "}
            </span>
            <Button variant="outlined" color="primary" href="#outlined-buttons"
            onClick={this.communityJoinHandler}>
            Join
          </Button></React.Fragment>)
            }
            
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

Community.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps,  { getPostJoinCommunity })(withStyles(styles)(Community));
