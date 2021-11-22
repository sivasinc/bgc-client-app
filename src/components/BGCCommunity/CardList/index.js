import React, { useState } from "react";
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
import "./CommunityCard.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@material-ui/core/Grid";

const useStyles = (muiBaseTheme) => ({
  cardContainer: {
    height: "182px",
    width: {
      sx: 1.0, // 100%
      sm: 250,
      md: 365,
    },
    minWidth: 275,
    margin: "10px",
  },
  cardTitle: {
    height: "24px",
    width: "146px",
    color: "rgba(0,0,0,0.87)",
    fontFamily: "Roboto",
    fontSize: "20px",
    fontWeight: 500,
    letterSpacing: "0.15px",
    lineHeight: "24px",
  },
  cardSubTitle: {
    height: "20px",
    width: "89px",
    color: "rgba(0, 0, 0, 0.74)",
    fontfamily: "Roboto",
    fontsize: "14px",
    letterspacing: "0.25px",
    lineheight: "20px",
  },

  title: {
    color: "red",
  },
});

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
  const [updateCommunityId, setUpdatedCommunityId] = useState("");

  const joinCommunity = (communityId) => {
    setUpdatedCommunityId(communityId);
    joinCommunityHandler(communityId);
  };

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

  const classes = useStyles();

  return (
    <div>
      {Array.isArray(recommendedCommunities) &&
        recommendedCommunities.length > 0 && (
          <div className="recomended_container">
            <div className="recommended__community__header">
              <h2>Your Recommended Communities</h2>
              <CloseIcon color="primary" />
            </div>
            <div>
              <Grid container spacing={2} justify="flex-start">
                {recommendedCommunities.map((community, key) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card style={classes.cardContainer}>
                      <CardHeader
                        classes={{
                          title: classes.cardTitle,
                          subheader: classes.cardSubTitle,
                        }}
                        titleTypographyProps={{ variant: "h6" }}
                        avatar={
                          <Avatar
                            aria-label="recipe"
                            alt="Remy Sharp"
                            className="MyCommunity__body_item__image"
                            src={community.image}
                          />
                        }
                        title={community.name}
                        subheader={
                          community.members && Array.isArray(community.members)
                            ? community.members.length + " Members"
                            : 0 + " Members"
                        }
                      />
                      <CardContent>
                        <Typography
                          className="_community__card__body__Text"
                          variant="body2"
                          color="text.secondary"
                        >
                          {community.description}
                        </Typography>
                      </CardContent>

                      {joinCommunityLoading &&
                      updateCommunityId === community.communityId ? (
                        <LoadingButton loading variant="outlined">
                          Submit
                        </LoadingButton>
                      ) : (
                        <Typography
                          component={Link}
                          onClick={() => joinCommunity(community.communityId)}
                          color="primary"
                          className="__community__card__join__button"
                        >
                          JOIN COMMUNITY
                        </Typography>
                      )}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        )}
    </div>
  );
};

CommunityCardList.propTypes = {};

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

withStyles(useStyles);
export default connect(mapStateToProps, mapDispatchToProps)(CommunityCardList);
