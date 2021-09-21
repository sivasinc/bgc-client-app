import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import FlipMove from "react-flip-move";
import CircularProgress from "@material-ui/core/CircularProgress";
import {setCurrentCommunityId} from '../../redux/actions/dataActions';
import { updateTabIndex } from '../../redux/actions/userActions';

const MyCommunities = ({ myCommunities, loadingMyCommunities, setCurrentCommunityId, updateTabIndex }) => {
  const history = useHistory();
  const communityClickHandler = (communityId) => {
    console.log('communityClickHandler');
    history.push("/communityHome");
    setCurrentCommunityId(communityId);
    updateTabIndex(3);
  }
  return (
    <div className="MyCommunity">
      <div className="MyCommunity__heading">
        <div className="MyCommunity__header">
          <h3>My Communities</h3>
        </div>
      </div>
      <div className="MyCommunity__body">
        {loadingMyCommunities && (
          <div className="MyCommunity__progressBar">
<CircularProgress size={30} className="progress" />
          </div>
        )}
        {!loadingMyCommunities && myCommunities.length === 0 && (
          <p>You have not joined any communities.</p>
        )}
        <FlipMove>
          {myCommunities.map((item) => (
            <div className="MyCommunity__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyCommunity__body_item__image"
                src={item.image}
              />
              {/* <Typography
          variant="p"
          component={Link}
          to={`/communityHome/${item.communityId}`}
          color="primary"
          className="MyCommunity__body_item_label"
        >
         {item.name}
        </Typography> */}
              <p><span onClick={() => communityClickHandler(item.communityId)} >{item.name}</span></p>
            </div>
          ))}
        </FlipMove>
      </div>
      <div className="MyCommunity__body__footer">
        <Typography
          variant="h6"
          component={Link}
          color="primary"
          className="recommended__communityBox_community_join_button"
        >
          {myCommunities.length === 0 ? 'Explore Alumnae Communities' : 'View All' }
        </Typography>
      </div>
    </div>
  );
};

MyCommunities.propTypes = {};

const mapStateToProps = (state) => ({
  myCommunities: state.data.myCommunities,
  loadingMyCommunities: state.data.loadingMyCommunities,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentCommunityId : (communityId) => dispatch(setCurrentCommunityId(communityId)),
  updateTabIndex: (tabIndex) => dispatch(updateTabIndex(tabIndex))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyCommunities);
