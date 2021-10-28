import React, { useState, Fragment } from "react";
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
  submitComment,
} from "../../redux/actions/dataActions";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
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

const Comments = ({openDialog, commentLists, postId, refreshFunction, submitComment, post, setOpenDialog, user: { userInfo }}) => {

const [comment, setComment] = useState("");
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleChange = (event) => {
    setComment(event.target.value);
    // this.setState({ comment: event.target.value });
  };
  const onSubmit = (e) => {
    console.log('user', userInfo);
    const { credentials : { firstName, lastName } } = userInfo;
    e.preventDefault();
    submitComment(postId, {
      body: comment,
      commentId: "",
      userName: `${firstName} ${lastName}`
    });
    setOpenDialog(false);
  };
  console.log('postId', postId);
  const { comments } = post;
    return (
      <Fragment>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <div className="comment__closeIcon"> <CloseIcon onClick={handleClose} color="primary"/></div>
         
          {/* <MyButton
            tip="Close"
            onClick={handleClose}
            // tipClassName={classes.closeButton}
          >
            <CloseIcon /> */}
          {/* </MyButton> */}
          <DialogContent>
            <div>
              <hr />
              {/* Comment Lists  */}
              {console.log(commentLists)}

              {comments &&
                comments.map(
                  (comment, index) =>
                    !comment.responseTo && (
                      <React.Fragment>
                        <SingleComment
                          comment={comment}
                          postId={postId}
                          refreshFunction={refreshFunction}
                        />
                        <ReplyComment
                          CommentLists={comments}
                          postId={postId}
                          parentCommentId={comment.commentId}
                          refreshFunction={refreshFunction}
                        />
                      </React.Fragment>
                    )
                )}

              {/* Root Comment Form */}
              <form style={{ display: "flex" }} onSubmit={onSubmit}>
              <TextField
            name="singleComment"
            variant="outlined"
            type="text"
            placeholder="Leave your thoughts here ..."
            // className={classes.textField}
            value={comment}
            onChange={handleChange}
            fullWidth
          />
                <br />
                <Button  variant="contained" onClick={onSubmit}>
                  Submit
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
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
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Comments));
