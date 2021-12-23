import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import ReactPlayer from "react-player";
import { connect } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { getPostsOfCommunity } from "../../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../BGCComments/Comments";
import { getPostDetails } from "../../redux/actions/postActions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Post from "../BGCPortalHome/Post";
import FlipMove from "react-flip-move";
import { updateTabIndex } from "../../redux/actions/userActions";
import Button from "@mui/material/Button";
import "./CommunityHome.css";

import dayjs from "dayjs";

// import { getArticlesAPI } from '../actions';

const CommunityHome = ({
  user: { userInfo },
  loading,
  communityPosts,
  getAllPostOfACommunity,
  getCommentOfAPost,
  currentCommunityId,
}) => {
  const [showModal, setShowModal] = useState("close");
  const [commentLists, setCommentsList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSelectedPost, setCurrentSelectedPost] = useState("");
  useEffect(() => {
    if (currentCommunityId !== null) {
      getAllPostOfACommunity(currentCommunityId);
    }

    // updateTabIndex(3);
  }, []);
  useEffect(() => {
    if (currentCommunityId !== null) {
      getAllPostOfACommunity(currentCommunityId);
    }
  }, [loading]);

  const handleClick = (e) => {
    // e.preventDefault();
    // if(e.target !== e.currentTarget) {
    //     return;
    // }

    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };

  const HandleCommentDialoge = (postId) => {
    setOpenDialog(true);
    getCommentOfAPost(postId);
    setCurrentSelectedPost(postId);
  };

  const updateComment = (newComment) => {
    setCommentsList([...commentLists.concat(newComment)]);
  };
  const { imageUrl, email } = userInfo;
  let enablePost =
    communityPosts &&
    communityPosts.community &&
    Array.isArray(communityPosts.community.members) &&
    communityPosts.community.members.filter((item) => item.email === email)
      .length > 0
      ? true
      : false;
  return (
    <Container>
      {enablePost && (
        <ShareBox>
         <div className="__community__feed__">
            <h2>Community Feed</h2>
            <Button
              variant="contained"
              onClick={handleClick}
              disabled={loading ? true : false}
              color="primary"
            >
              POST SOMETHING
            </Button>
          </div>
        </ShareBox>
      )}

      <Content>
        <FlipMove>
          {loading && <CircularProgress size={30} thickness={2} />}
          {communityPosts &&
            Array.isArray(communityPosts.posts) &&
            communityPosts.posts.length != 0 &&
            communityPosts.posts.map((article, key) => (
              <Post key={key} article={article} source="community" />
            ))}
        </FlipMove>
      </Content>

      <PostModal
        showModal={showModal}
        handleClick={handleClick}
        communityId={currentCommunityId}
      />
    </Container>
  );
};

const Container = styled.div`
  grid-area: main;
`;

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
  margin: 0 0 20px 0;
  background: #fff;

  div {
    .post-space {
      box-shadow: 1px 1px 2px 1px rgba(159, 156, 156, 0.75);
    }

    .post-icon {
      width: 27px;
    }

    &:first-child {
      display: flex;
      align-items: center;
      padding: 4px 16px;
      text-align: left;
      justify-content: "space-between"
       img {
        width: 48px;
        margin-right: 8px;
        border-radius: 50%;
      }
    }

    &:nth-child(2) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;
    }
  }
`;

const Article = styled(CommonCard)`
  padding: 0;
  margin: 0 0 8px;
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

        &:first-child {
          font-size: 14px;
          font-weight: 700;
          color: rgba(0, 0, 0, 1);
        }

        &:nth-child(n + 1) {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.6);
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
  padding: 0 16px;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.9);
  font-size: 14px;
  text-align: left;
`;

const SharedImage = styled.div`
  margin-top: 8px;
  width: 100%;
  max-height: 250px;
  display: block;
  position: relative;
  background-color: #f9fafb;

  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
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

const SocialActions = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin: 0;
  min-height: 40px;
  padding: 4px 8px;

  button {
    display: inline-flex;
    align-items: center;
    padding: 8px;
    color: #6200ee;
    border: none;
    cursor: pointer;
    background-color: #fff;

    @media (min-width: 768px) {
      span {
        margin-left: 8px;
      }
    }
  }
  p {
    color: #6200ee;
    margin: 0 10px 0 10px;
  }
`;

const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;
  }
`;

const mapStateToProps = (state) => {
  return {
    loading: state.UI.loading,
    user: state.user,
    communityPosts: state.data.communityPosts,
    currentCommunityId: state.data.currentCommunityId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllPostOfACommunity: (communityId) =>
    dispatch(getPostsOfCommunity(communityId)),
  getCommentOfAPost: (postId) => dispatch(getPostDetails(postId)),
  updateTabIndex: () => dispatch(updateTabIndex(3)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityHome);
