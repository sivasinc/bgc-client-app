import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { collection, query, onSnapshot, orderBy, where, doc } from "@firebase/firestore";
import { db } from "../../firebase";
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

const Comments = ({openDialog, updatedComment, postId, refreshFunction, submitComment,getPostDetails, setOpenDialog, user: { userInfo }}) => {
  const [currentPost, setCurrentPost] = useState({});

  useEffect(() => {
    const unsubPost = onSnapshot(doc(db, "posts", postId) , (docSnap) => {
      let postData = {};
      if (docSnap.exists()) {
        postData = docSnap.data();
        postData.postId = docSnap.id;
        const commentsRef = query(collection(db, "comments"), 
        where("postId", "==", postId),
        orderBy("createdAt", "desc"));
        const unsubCommentSnap = onSnapshot(commentsRef, (commentSnapshot) => {
          postData.comments = [];
          commentSnapshot.forEach((doc) => {
            postData.comments.push({
              commentId: doc.id,
              postId: doc.data().postId,
              body: doc.data().body,
              createdAt: doc.data().createdAt,
              userHandle: doc.data().userHandle,
              userName: doc.data().userName,
              responseTo: doc.data().responseTo,
              userImage: doc.data().userImage,
              likeCount: doc.data().likeCount,
              usersLiked: doc.data().usersLiked
            });
          });
          setCurrentPost({...postData});
        });
        return () => unsubCommentSnap()
      }
    });
    return () =>  unsubPost()
   },[])

const [comment, setComment] = useState("");
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleChange = (event) => {
    setComment(event.target.value);
    // this.setState({ comment: event.target.value });
  };
  const onSubmit = (e) => {
    const { firstName, lastName, email, imageUrl } = userInfo;
    e.preventDefault();
    submitComment(postId, {
      body: comment,
      userName: `${firstName} ${lastName}`,
      responseTo: "",
      createdAt: new Date().toISOString(),
      postId: postId,
      userHandle: email,
      userImage: imageUrl,
      likeCount: 0,
      usersLiked: []
    });
    // setOpenDialog(false);
    setComment("");
  };
  const { comments } = currentPost;
    return (
      <Fragment>
            <div>
              <hr />
              <form style={{ display: "flex" }} onSubmit={onSubmit} className="form__text">
              <TextField
            name="singleComment"
            type="text"
            variant="outlined"
            multiline
            rows={2}
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
