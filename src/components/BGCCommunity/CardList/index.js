import { ListItem } from "@material-ui/core";
import React, { Component } from "react";
import CommunityCard from "../Card";
//import List from "@material-ui/core/List";
import Stack from "@mui/material/Stack";
import {
  setCurrentCommunityId,
  getRecommendedCommunity,
  joinCommunity,
  getAllCommunityOfUser,
  getAllPostsOfUser,
} from "../../../redux/actions/dataActions";
import { updateTabIndex } from "../../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";

const CommunityCardList = ({
  myCommunities,
  loadingMyCommunities,
  setCurrentCommunityId,
  updateTabIndex,
  user,
  loading,
  usersPosts,
  getAllPostOfUserMemberCommunity,
  joinACommunity,
  getAllRecommendedCommunities,
  recommendedCommunities,
  isRefreshCommunity,
  getAllUserCommunities,
  recommendedCommunityLoading,
  joinCommunityLoading,
  loadingUsersPosts,
}) => {
  const history = useHistory();
  const communityClickHandler = (communityId) => {
    console.log("communityClickHandler");
    history.push("/communityHome");
    setCurrentCommunityId(communityId);
    updateTabIndex(3);
  };
  const joinCommunityHandler = (communityId) => {
    console.log("communityId", communityId);
    joinACommunity(communityId);
  };

  return (
    <div>
      {Array.isArray(recommendedCommunities) &&
        recommendedCommunities.length > 0 && (
          <div className="recomended_container">
            <div className="recommended__communityBox__header">
              <h2>Your Recommended Communities</h2>
            </div>
            <Stack direction="row" spacing={1} style={{ justifyContent: 'space-evenly' }}>
              {recommendedCommunities.map((community, key) => {
                console.log(community);
                return (
                  <CommunityCard
                    key={key}
                    community={community}
                    joinCommunityHandler={joinCommunityHandler}
                    joinCommunityLoading={joinCommunityLoading}
                  ></CommunityCard>
                );
              })}
            </Stack>
          </div>
        )}
    </div>
  );
};

CommunityCardList.propTypes = {};

const Container = styled.div`
  grid-area: main;
  margin-top: 20px;
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
    loading: state.user.loading,
    user: state.user,
    loadingMyCommunities: state.data.loadingMyCommunities,
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
  getAllPostOfUserMemberCommunity: () => dispatch(getAllPostsOfUser()),
  getAllUserCommunities: () => dispatch(getAllCommunityOfUser()),
  getAllRecommendedCommunities: () => dispatch(getRecommendedCommunity()),
  joinACommunity: (communityId) => dispatch(joinCommunity(communityId)),
  setCurrentCommunityId: (communityId) =>
    dispatch(setCurrentCommunityId(communityId)),
  updateTabIndex: (tabIndex) => dispatch(updateTabIndex(tabIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityCardList);