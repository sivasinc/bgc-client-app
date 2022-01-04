import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { DocumentViewer } from "react-documents";
import PropTypes from "prop-types";
import "./Post.css";
import dayjs from "dayjs";
import ReactPlayer from "react-player";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentsSection from "../BGCComments/CommentsSection";
import { getPostDetails } from "../../redux/actions/postActions";
import {
  likePost,
  dislikePost,
  getAllPostsOfUser,
  getPostsOfCommunity,
} from "../../redux/actions/dataActions";
import ReportPost from "./ReportPost";
import EditOrDeletePost from "./EditOrDeletePost";
import Linkify from "react-linkify";

const componentDecorator= (decoratedHref, decoratedText, key) => (
  <a target="_blank" style={{color: '#6200ee', cursor: 'pointer'}} href={decoratedHref} key={key}>
{decoratedText}
</a>
)

const Post = ({
  key,
  article,
  getCommentOfAPost,
  likeAPost,
  disLikeAPost,
  user: { userInfo },
  getAllPostOfUserMemberCommunity,
  getAllPostOfACommunity,
  source,
  currentCommunityId,
}) => {
  const [updatedComment, setUpdatedComment] = useState(false);
  const [likeActionState, setLikeActionState] = useState("action");
  const [selectedPostId, setSelectedPostId] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSelectedPost, setCurrentSelectedPost] = useState("");
  const likeHandler = (postId) => {
    const { email } = userInfo;
    if (
      article &&
      article.usersLiked &&
      Array.isArray(article.usersLiked) &&
      article.usersLiked.includes(email)
    ) {
      disLikeAPost(postId, source);
    } else {
      likeAPost(postId, source);
    }
  };
  const handleCommentDialoge = (postId) => {
    setOpenDialog(!openDialog);
    getCommentOfAPost(postId);
    setCurrentSelectedPost(postId);
    if (source === "home") {
      getAllPostOfUserMemberCommunity();
    } else {
      getAllPostOfACommunity(currentCommunityId);
    }
  };
  const updateComment = (value) => {
    setUpdatedComment(value);
  };

  const { email } = userInfo;
  console.log("article", article);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const showDocument = () => {
    if (article.sharedDocumentURL) {
      return (
        <SharedImage>
          {article.docType === "image" ? (
            <img src={article.sharedDocumentURL} />
          ) : (
            <DocumentViewer viewer="google" url={article.sharedDocumentURL} />
          )}
        </SharedImage>
      );
    }

    return null;
  };

  console.log("article", article);
  return (
    <Article key={key}>
      <SharedActor>
        <a>
          <img src={article.userImage} alt="" />
          <div>
            {source === "home" ? (
              <span className="sharedActor__userLabel">
                {article.userName}{" "}
                <span className="sharedActor__userLabel_sub">posted on </span>{" "}
                {article.communityName}
              </span>
            ) : (
              <span className="sharedActor__userLabel">
                {article.userName}{" "}
                <span className="sharedActor__userLabel_sub">posted</span>
              </span>
            )}
            {article.userHandle && email !== article.userHandle && (
              <ReportPost article={article} email={email} />
            )}
            {article.userHandle && email === article.userHandle && (
              <EditOrDeletePost article={article} email={email} />
            )}
            <span>
              {dayjs(article.createdAt).format("MMMM DD YYYY, h:mm a")}
            </span>
          </div>
        </a>

        {/* <button>
                                        <img src="images/ellipsis.png" alt="" />
                                    </button> */}
      </SharedActor>
      <Description>
        <Linkify componentDecorator={componentDecorator} >
      {article.body}
      </Linkify>
      </Description>
      {showDocument()}
      {ReactPlayer.canPlay(article.sharedVideo) ? (
        <ReactPlayer
          style={{ padding: "0 16px" }}
          width={"100%"}
          url={article.sharedVideo}
        />
      ): null}
      <SocialActions>
        {article.usersLiked.includes(email) && <FavoriteIcon color="primary" />}
        <Typography
          variant="button"
          color="primary"
          onClick={() => likeHandler(article.postId)}
        >
          {article.usersLiked.includes(email) ? "LIKED" : "LIKE"}
        </Typography>
        <Typography
          variant="button"
          color="primary"
          onClick={() => handleCommentDialoge(article.postId)}
        >
          POST A COMMENT
        </Typography>
        <p>{article.commentCount} comments</p>
        <p>{article.likeCount} Likes</p>
      </SocialActions>
      {console.log(
        "state",
        openDialog && currentSelectedPost === article.postId
      )}
      {openDialog && currentSelectedPost === article.postId && (
        <div className="portalHome__comments">
          <CommentsSection
            updatedComment={updatedComment}
            postId={article.postId}
            key={article.postId}
            refreshFunction={updateComment}
            setOpenDialog={setOpenDialog}
            openDialog={openDialog}
          />
        </div>
      )}
    </Article>
  );
};
const CommonCard = styled.div`
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  border: none;
  border-radius: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`;

const ShareBox = styled(CommonCard)`
  display: flex;
  flex-direction: column;
  color: #958b7b;
  margin: 0 0 8px 0;
  background: #fff;

  div {
    button {
      outline: none;
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 1.5;
      min-height: 48px;
      background: transparent;
      border: none;
      display: flex;
      curosr: pointer;
      align-items: center;
      font-weight: 600;

      &:hover {
        background-color: rgba(0, 0, 0, 0.07);
        border-radius: 6px;
      }
    }

    .post-space {
      box-shadow: 1px 1px 2px 1px rgba(159, 156, 156, 0.75);
    }

    .post-icon {
      width: 27px;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 8px 16px;

      img {
        width: 48px;
        margin-right: 8px;
        border-radius: 50%;
      }

      button {
        margin: 4px 0;
        flex-grow: 1;
        border-radius: 35px;
        padding-left: 16px;
        border: 1px solid rgba(0, 0, 0, 0, 15);
        border-radius: 10px;
        background-color: #fff;
        text-align: left;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;

      button {
        img {
          margin: 0 4px 0 -2px;
        }

        span {
          color: #70b5f9;
        }
      }
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 20px;
  overflow: visible;
`;

const SharedActor = styled.div`
  padding-right: 40px;
  flex-wrap: nowrap;
  padding: 12px 16px 0;
  margin-bottom: 8px;
  align-items: center;
  display: flex;

  a {
    margin-right: 12px;
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    text-decoration: none;

    img {
      width: 48px;
      height: 48px;
      border-radius: 100px;
    }

    & > div {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      flex-basis: 0;
      margin-left: 8px;
      overflow: hidden;

      span {
        text-align: left;
        color: rgba(0, 0, 0, 0.87);
        font-family: Roboto;
        font-size: 14px;
        letter-spacing: 0.15px;
        line-height: 24px;

        &:first-child {
          color: rgba(0, 0, 0, 1);
          color: rgba(0, 0, 0, 0.87);
          font-family: Roboto;
          font-size: 16px;
          letter-spacing: 0.15px;
          line-height: 24px;
        }

        &:nth-child(n + 1) {
          // font-size: 14px;
          // color: rgba(0,0,0,0.6);
        }
      }
    }
  }

  button {
    position: absolute;
    right: 12px;
    outline: none;
    border: none;
    top: 0;
    background: transparent;
  }
`;

const Description = styled.div`
  line-break: anywhere;
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto;
  font-size: 16px;
  letter-spacing: 0.5px;
  line-height: 24px;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  max-height: 250px;
  padding: 0 16px;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: fill;
    width: 100%;
    height: 200px;
  }
`;

const SocialCounts = styled.ul`
  line-height: 100%;
  display: flex;
  align-items: flex-start;
  overflow: auto;
  list-style: none;
  margin: 0 16px;
  padding: 8px 0;
  border-bottom: 1px solid #e9e5df;

  li {
    margin-right: 5px;
    font-size: 12px;

    button {
      display: flex;
      border: none;
      background: #fff;
    }
  }

  img {
    width: 18px;
  }
`;

export const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  span {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #6200ee;
    border: none;
    cursor: pointer;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
  p {
    color: #6200ee;
    margin: 0 10px 0 10px;
    color: rgba(18, 18, 18, 0.87);
    font-family: Roboto;
    font-size: 12px;
    letter-spacing: 0.4px;
  }
`;
Post.propTypes = {};

const mapStateToProps = (state) => {
  return {
    loading: state.UI.loading,
    user: state.user,
    usersPosts: state.data.usersPosts,
    communities: state.data.communities,
    currentCommunityId: state.data.currentCommunityId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCommentOfAPost: (postId) => dispatch(getPostDetails(postId)),
  likeAPost: (postId, source) => dispatch(likePost(postId, source)),
  disLikeAPost: (postId, source) => dispatch(dislikePost(postId, source)),
  getAllPostOfUserMemberCommunity: (userId) =>
    dispatch(getAllPostsOfUser(userId)),
  getAllPostOfACommunity: (communityId) =>
    dispatch(getPostsOfCommunity(communityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
