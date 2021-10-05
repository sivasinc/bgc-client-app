import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";


import { editUserDetails } from '../../redux/actions/userActions';


const Members = ({ communityPosts: { community: { members } = [] } = {} }) => {
    return (
        <div className="MyNetworks">
        <div className="MyNetworks__heading">
          <div className="MyNetworks__header">
            <p>Members</p>
          </div>
          <div className="MyNetworks__header__right">
          <span>{members && Array.isArray(members) && members.length} Members</span>
          </div>
        </div>
        <div className="MyNetworks__body">
          { members && Array.isArray(members) && members.map((item) => (
              <div className="MyNetworks__body_item">
                <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src={item.imageUrl}
              />
              <p>{item.firstName}</p>
                </div>
            ))
            }
        </div>
        <div className="MyNetworks__body__footer">
        <Typography
          variant="h6"
          component={Link}
          color="primary"
          className="recommended__communityBox_community_join_button"
        >
         View All
        </Typography>
      </div>
      </div>);
}

Members.propTypes = {

}

const mapStateToProps = (state) => ({
    user :state.user,
    communityPosts: state.data.communityPosts,
   });
   const mapDispatchToProps = { editUserDetails };
   
   export default connect(mapStateToProps, mapDispatchToProps) (Members);
