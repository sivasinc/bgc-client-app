import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

// Icons
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import {
  getScream,
  clearErrors,
  submitComment
} from "../../redux/actions/dataActions";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import {getPostDetails} from '../../redux/actions/postActions';
import './Comments.css';

const styles = (theme) => ({
  ...theme,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

const Comments = ({openDialog, updatedComment, postId, refreshFunction, submitComment,getPostDetails, post, setOpenDialog, user: { userInfo }}) => {

 useEffect(() => {
  getPostDetails(postId);
 }, []) 
const [comment, setComment] = useState("");
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleChange = (event) => {
    setComment(event.target.value);
    // this.setState({ comment: event.target.value });
  };
  const onSubmit = (e) => {
<<<<<<< HEAD
    const { firstName, lastName, email, imageUrl } = user;
=======
    const { firstName, lastName, email, imageUrl } = userInfo;
>>>>>>> upstream/main
    e.preventDefault();
    submitComment(postId, {
      body: comment,
      userName: `${firstName} ${lastName}`,
      responseTo: "",
      createdAt: new Date().toISOString(),
      postId: postId,
      userHandle: email,
      userImage: imageUrl
    });
    // setOpenDialog(false);
    setComment("");
  };
  console.log('post', post);
  const { comments } = post;
    return (
      <Fragment>
            <div>
              <hr />
              <form style={{ display: "flex" }} onSubmit={onSubmit} className="form__text">
              <TextField
            name="singleComment"
            type="text"
            variant="outlined"
            placeholder="Add your comments here ..."
            // className={classes.textField}
            value={comment}
            onChange={handleChange}
            fullWidth
          />
                <br />
                <Button  size="small" onClick={onSubmit}>
                  Post
                </Button>
              </form>
              {comments &&
                comments.map(
                  (comment, index) =>
                    !comment.responseTo && (
                      <React.Fragment>
                        <SingleComment
                          key={index}
                          comment={comment}
                          updatedComment={updatedComment}
                          postId={postId}
                          refreshFunction={refreshFunction}
                        />
                        <ReplyComment
                          key={index}
                          CommentLists={comments}
                          updatedComment={updatedComment}
                          postId={postId}
                          parentCommentId={comment.commentId}
                          firstChildCommentId = { comment.commentId }
                          refreshFunction={refreshFunction}
                        />
                      </React.Fragment>
                    )
                )}
<<<<<<< HEAD
              {/* Root Comment Form */}
              <form style={{ display: "flex" }} onSubmit={onSubmit} className="form__text">
              <TextField
            name="singleComment"
            type="text"
            variant="outlined"
            placeholder="Add your comments here ..."
            // className={classes.textField}
            value={comment}
            onChange={handleChange}
            fullWidth
          />
                <br />
                <Button  size="small" onClick={onSubmit}>
                  Submit
                </Button>
              </form>
=======
>>>>>>> upstream/main
            </div>
      </Fragment>
    );
  }

Comments.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
  submitComment,
  getPostDetails,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Comments));
