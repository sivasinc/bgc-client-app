import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';


const RecommenedCommunity = ({community, joinCommunityHandler, joinCommunityLoading}) => {

  const [updateCommunityId, setUpdatedCommunityId] = useState('');

  const joinCommunity = (communityId) => {
    setUpdatedCommunityId(communityId);
    joinCommunityHandler(communityId);
  }

    return (
        <div className="recommended__communityBox_community">
            <div className="recommended__communityBox_community_header">
                {/* <div className="recommended__communityBox_community_header_img">
                <Avatar
                alt="Remy Sharp"
                className="MyNetworks__body_item__image"
                src={community.image}
              />
                </div> */}
                <div className="recommended__communityBox_community_header_text">
                <h3>{community.name}</h3>
                     <p>230 members</p>
                </div>
            </div>
             
                    
                     <p>{community.description}</p>
                     {/* <Typography
                variant="h6"
                component={Link}
                onClick={() => joinCommunityHandler(community.communityId)}
                color="primary"
                className="recommended__communityBox_community_join_button"
              >
               Join Community
              </Typography> */}
              {joinCommunityLoading && updateCommunityId === community.communityId ? <LoadingButton loading variant="outlined">
        Submit
      </LoadingButton> : <Typography
                variant="h6"
                component={Link}
                onClick={() => joinCommunity(community.communityId)}
                color="primary"
                className="recommended__communityBox_community_join_button"
              >
               Join Community
              </Typography>} 
                 </div>
    )
}

RecommenedCommunity.propTypes = {

}

export default RecommenedCommunity
