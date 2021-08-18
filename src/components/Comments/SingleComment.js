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

function SingleComment({ comment, classes, submitComment, postId }) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");

  const openReply = () => {
    setOpenReply(!OpenReply);
  };
  const onSubmit = (e) => {
    const { commentId } = comment;
    e.preventDefault();
    submitComment(postId, { body: CommentValue, commentId });
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

  const { body, createdAt, userImage, userHandle } = comment;
  return (
    <React.Fragment key={createdAt}>
      <Grid item sm={12}>
        <Grid container>
          <Grid item sm={9}>
            <div className={classes.commentData}>
              <Typography
                variant="h5"
                component={Link}
                to={`/users/${userHandle}`}
                color="primary"
              >
                {userHandle}
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
        <form style={{ display: "flex" }} onSubmit={onSubmit}>
          <TextField
            name="singleComment"
            tpye="text"
            placeholder="Leave your thoughts here ..."
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
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(SingleComment)
);
