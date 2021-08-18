import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import Comments from "./Comments";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Icons
import CloseIcon from "@material-ui/icons/Close";
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

class CommentsItems extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
    comment: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };
  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    this.props.submitComment(this.props.postId, {
      body: this.state.comment,
      commentId: "",
    });
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
      postId,
      refreshFunction,
    } = this.props;
    const { commentLists } = this.props;
    const { comment } = this.state;
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Expand scream"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <br />
          <DialogContent className={classes.dialogContent}>
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
                          postId={screamId}
                          parentCommentId={comment.commentId}
                          refreshFunction={refreshFunction}
                        />
                      </React.Fragment>
                    )
                )}

              {/* Root Comment Form */}
              <form style={{ display: "flex" }} onSubmit={this.onSubmit}>
                <TextField
                  style={{ width: "100%", borderRadius: "5px" }}
                  onChange={this.handleChange}
                  value={comment}
                  placeholder="Leave your thoughts here ..."
                />
                <br />
                <Button color="primary" onClick={this.onSubmit}>
                  Submit
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CommentsItems.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
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
)(withStyles(styles)(CommentsItems));
