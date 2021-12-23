import React, { useState } from "react";
import Axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likeComment, dislikeComment, submitComment } from "../../redux/actions/dataActions";
import LikeDislikes from "./LikeDislikes";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import dayjs from "dayjs";
import { borderRadius } from "@mui/system";
import Linkify from "react-linkify";
import { SocialActions } from "../BGCPortalHome/Post";

const styles = (theme) => ({
  ...theme,
  commentImage: {
    maxWidth: "100%",
    height: 100,
    objectFit: "cover",
    borderRadius: "50%",
  },
  commentData: {
    marginLeft: 20,
  },
  bodyPadding: {
    lineBreak: 'anywhere',
    padding: 5,
  },
  iconSpacing: {
    paddingRight: 10,
  },
  commentBox: {
    background: '#ffffff',
    borderRadius: '5px',
    transition: 'box-shadow 83ms',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    boxShadow: '0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%)',
    marginBottom: '20px'
  }
});

function SingleComment({ comment, classes, submitComment, postId, user: { userInfo }, refreshFunction, likeAComment, dislikeAComment, source }) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const {  firstName, lastName, email, imageUrl } = userInfo;

  const openReply = () => {
    setOpenReply(!OpenReply);
  };
  const onSubmit = (e) => {
    const { commentId } = comment;
    e.preventDefault();
    submitComment(postId, { 
      body: CommentValue, 
      responseTo: commentId, 
      userName: `${firstName} ${lastName}`,
      createdAt: new Date().toISOString(),
      postId,
      userHandle: email,
      userImage: imageUrl
    });
    openReply();
    refreshFunction(true);
  };
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const actions = [
    <LikeDislikes comment commentId={comment.commentId} />,
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];

  const { body, createdAt, userImage, userHandle, userName, likeCount=0, usersLiked=[], commentId } = comment;

  const liked = usersLiked.includes(email)

  const likeHandler = ()=>{
    if(!liked){
    return likeAComment(commentId, postId)
    }
    return dislikeAComment(commentId, postId)
  }

  return (
    <div key={createdAt} className="comment_section">
       <div className="comment_section__box">
         <div className="comment_section__left">
         <Avatar alt="Remy Sharp" src={userImage} />
         </div>
         <div className="comment_section__right">
         <div className="comment_section__right__header">
              <p className="single_comment_userLabel">{userName}</p>
              {/* <Typography
                variant="h6"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                
              </Typography> */}
              <p className="single_comment_userLabel">{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}</p>
              </div>
              <div className="comment_section__body">
              <Typography variabnt="body1" className={classes.bodyPadding}>
                <Linkify>
                {body}
                </Linkify>
              </Typography>
              </div>
                <SocialActions>
                {liked && <FavoriteIcon style={{color: '#6200ee'}} />}
                <Typography
                variant="button"
                color="primary"
                onClick={likeHandler}
              >{ liked ? "LIKED" : "LIKE"}</Typography>
                <Typography
                variant="button"
                onClick={openReply}
                color="primary"
              >REPLY</Typography>
              <p>
                {likeCount} Likes
              </p>
              {/* <ReplyIcon
                onClick={openReply}
                key="comment-basic-reply-to"
                color="primary"
              >
                Reply to{" "}
              </ReplyIcon> */}
                </SocialActions>
              
         </div>
         
       </div>
       <div className="comment_section__actions">
         {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit} className="form__text">
          <TextField
            name="singleComment"
            type="text"
            multiline
            rows={2}
            maxRows={4}
            variant="outlined"
            placeholder="Add your reply to comment here ..."
            className={classes.textField}
            value={CommentValue}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <Button size="small" onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
         </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user : state.user
});

const mapDispatchToProps = (dispatch) => ({
  likeAComment: (commentId, postId) => dispatch(likeComment(commentId, postId)),
  dislikeAComment: (commentId, postId) => dispatch(dislikeComment(commentId, postId)),
  submitComment: submitComment,
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(SingleComment)
);
