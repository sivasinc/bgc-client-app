import React, { useState } from "react";
import Axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";
import LikeDislikes from "./LikeDislikes";
import ReplyIcon from "@material-ui/icons/Reply";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
import dayjs from "dayjs";

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
    padding: 5,
  },
  iconSpacing: {
    paddingRight: 10,
  },
});

function SingleComment({ comment, classes, submitComment, postId, user, refreshFunction }) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const openReply = () => {
    setOpenReply(!OpenReply);
  };
  const onSubmit = (e) => {
    const { commentId } = comment;
    const { credentials : { firstName, lastName } } = user;
    e.preventDefault();
    submitComment(postId, { body: CommentValue, commentId, userName: `${firstName} ${lastName}` });
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

  const { body, createdAt, userImage, userHandle, userName } = comment;
  return (
    <div key={createdAt} className="comment_section">
      <Grid item sm={12}>
        <Grid container>
          <Grid item sm={9}>
            <div className={classes.commentData}>
              <Typography
                variant="h6"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                {userName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
              </Typography>
              <hr className={classes.invisibleSeparator} />
              <Typography variabnt="body1" className={classes.bodyPadding}>
                {body}
              </Typography>
              <ThumbUpIcon color="primary" className={classes.iconSpacing} />
              <ThumbDownAltIcon
                color="primary"
                className={classes.iconSpacing}
              />
              <ReplyIcon
                onClick={openReply}
                key="comment-basic-reply-to"
                color="primary"
              >
                Reply to{" "}
              </ReplyIcon>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {OpenReply && (
        <form style={{ display: "flex" }} onSubmit={onSubmit} className="form__text">
          <TextField
            name="singleComment"
            tpye="text"
            placeholder="Add your reply to comment here ..."
            className={classes.textField}
            value={CommentValue}
            onChange={handleChange}
            fullWidth
          />
          <br />
          <Button color="primary" onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
  user : state.user
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(SingleComment)
);
