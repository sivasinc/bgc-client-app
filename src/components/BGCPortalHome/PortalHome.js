import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostModal from "./PostModal";
import { connect } from "react-redux";
import ImageIcon from "@mui/icons-material/Image";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { getAllPostsOfUser } from "../../redux/actions/dataActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import Comments from "../BGCComments/Comments";
import { getPostDetails } from "../../redux/actions/postActions";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import RecommenedCommunity from "./RecommenedCommunity";
import {
  getRecommendedCommunity,
  joinCommunity,
  getAllCommunityOfUser,
} from "../../redux/actions/dataActions";
import CommentsSection from "../BGCComments/CommentsSection";
import InfoIcon from "@mui/icons-material/Info";
import Post from "./Post";
import FlipMove from "react-flip-move";

import TextField from "@mui/material/TextField";
import "./PortalHome.css";

import dayjs from "dayjs";

// import { getArticlesAPI } from '../actions';

const CommunityHome = ({
  user: {userInfo},
  loading,
  usersPosts,
  getAllPostOfUserMemberCommunity,
  joinACommunity,
  getAllRecommendedCommunities,
  recommendedCommunities,
  isRefreshCommunity,
  getAllUserCommunities,
  myCommunities,
  recommendedCommunityLoading,
  joinCommunityLoading,
  loadingUsersPosts,
}) => {
  const [showModal, setShowModal] = useState("close");
  const [likeActionState, setLikeActionState] = useState("action");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentSelectedPost, setCurrentSelectedPost] = useState("");
  useEffect(() => {
    const { email } = userInfo;
    if (email !== undefined) {
      getAllRecommendedCommunities();
      getAllPostOfUserMemberCommunity();
      getAllUserCommunities();
    }
  }, []);
  useEffect(() => {
    const { email } = userInfo;
    if (email !== undefined) {
      getAllPostOfUserMemberCommunity();
    }
  }, []);

  
  // useEffect(() => {
  //     const { email } = credentials;
  //     if(email !== undefined) {
  //         getAllRecommendedCommunities(email);
  //         getAllPostOfUserMemberCommunity(email);
  //         getAllUserCommunities();
  //     }
  // }, [joinCommunityLoading]);

  const handleClick = (e) => {
    e.preventDefault();
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
  const joinCommunityHandler = (communityId) => {
    console.log("communityId", communityId);
    joinACommunity(communityId);
  };
  let postSectionMessage = "There are no posts in the community";
  if (myCommunities.length === 0) {
    postSectionMessage =
      "Go Ahead and join a community to begin seeing some post here.";
  }
  const { imageUrl } = userInfo;
  return (
    <Container>
      {Array.isArray(recommendedCommunities) &&
        recommendedCommunities.length > 0 && (
          <div className="recommended__communityBox">
            <div className="recommended__communityBox__header">
              <h2>Your Recommended Communites</h2>
              <CloseIcon color="primary" />
            </div>
            <div className="recommended__communityBox_communities">
              {recommendedCommunityLoading ? (
                <CircularProgress size={30} className="progress" />
              ) : (
                recommendedCommunities.map((community, key) => (
                  <RecommenedCommunity
                    key={key}
                    community={community}
                    joinCommunityHandler={joinCommunityHandler}
                    joinCommunityLoading={joinCommunityLoading}
                  />
                ))
              )}
            </div>
          </div>
        )}

      <Content>
        {loadingUsersPosts && <CircularProgress size={30} thickness={2} />}
        {!loadingUsersPosts && usersPosts.length === 0 && (
          <div className="portalHome__no_postMessage">
            <InfoIcon />
            <p>{postSectionMessage}</p>
          </div>
        )}
        <FlipMove>
        {usersPosts.map((article, key) => (
          <Post key={key} article={article} source="home" />
        ))}
        </FlipMove>
      </Content>
      <PostModal showModal={showModal} handleClick={handleClick} />
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
    usersPosts: state.data.usersPosts,
    isRefreshCommunity: state.data.isRefreshCommunity,
    recommendedCommunities: state.data.recommendedCommunities,
    myCommunities: state.data.myCommunities,
    recommendedCommunityLoading: state.data.recommendedCommunityLoading,
    joinCommunityLoading: state.data.joinCommunityLoading,
    loadingUsersPosts: state.data.loadingUsersPosts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllPostOfUserMemberCommunity: () =>
    dispatch(getAllPostsOfUser()),
  getAllUserCommunities: () => dispatch(getAllCommunityOfUser()),
  getAllRecommendedCommunities: () => dispatch(getRecommendedCommunity()),
  joinACommunity: (communityId) => dispatch(joinCommunity(communityId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityHome);
