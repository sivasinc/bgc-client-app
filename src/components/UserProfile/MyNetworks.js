import React, { useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Avatar from "@material-ui/core/Avatar";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";


import { editUserDetails } from '../../redux/actions/userActions';
import ModelWindow from "./ModelWindow";


const MyNetworks = ({ user: { myNetworks } }) => {
    return (
        <div className="MyNetworks">
        <div className="MyNetworks__heading">
          <div className="MyNetworks__header">
            <p>My Networks</p>
          </div>

         { myNetworks && Array.isArray(myNetworks) && myNetworks.length > 0 && (
            <div className="MyNetworks__header__right">
            <span>{myNetworks.length } Connections</span>
          </div>
         ) }
        </div>
        <div className="MyNetworks__body">
          {
            MyNetworks && Array.isArray(myNetworks) && myNetworks.length > 0 ?  myNetworks.map((item) => (
              <div className="MyNetworks__body_item">
              <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src={item.imageUrl}
              />
              <p>{item.firstName}</p>
        </div>
            )) : (
              <p>You have not added any connections.</p>
            )
          }
        </div>
        <div className="MyNetworks__body__footer">
        <Typography
          variant="h6"
          component={Link}
          color="primary"
          className="recommended__communityBox_community_join_button"
        >
        {myNetworks && Array.isArray(myNetworks) && myNetworks.length > 0 ? 'VIEW ALL' : 'View Alumnae Directory'} 
        </Typography>
      </div>
      </div>);
}

MyNetworks.propTypes = {

}

const mapStateToProps = (state) => ({
    user :state.user
   });
   const mapDispatchToProps = { editUserDetails };
   
   export default connect(mapStateToProps, mapDispatchToProps) (MyNetworks);
