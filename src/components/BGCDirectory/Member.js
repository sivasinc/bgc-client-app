import React from 'react'
import PropTypes from 'prop-types'
import Avatar from "@material-ui/core/Avatar";
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from "react-router-dom";


const Member = ({member : { imageUrl, firstName, lastName, headLine, email, memberId }, myNetworks , addMemberHandler, updateTabIndex }) => {
    const generateActionLink = () => {
        if(myNetworks && Array.isArray(myNetworks) && myNetworks.filter((item) => item.email === email).length > 0) {
            return (<React.Fragment>
<CheckIcon onClick={() => addMemberHandler(email)} /> <span onClick={() => addMemberHandler(email)} className="member_add_action_label">ON MY NETWORK</span>
            </React.Fragment>);
        } else {
            return (<React.Fragment>
                <AddIcon onClick={() => addMemberHandler(email)} /> <span onClick={() => addMemberHandler(email)} className="member_add_action_label">ADD TO MY NETWORK</span>
                            </React.Fragment>);
        }
    }

    // const userClickHandler = (userId) => {
    //     history.push("/userProfile");
    //   };
   
    return (
        <div className="member_block">
            <Avatar
                alt="Remy Sharp"
                className="member__image"
                src={imageUrl}
              />
              <span className="member_block_name"><Link
                      to={`/userProfile/${memberId}`}
                    //   onClick={() => userClickHandler(userId)}
                    > {firstName} {lastName}</Link></span>
              <span className="member_block_role">{headLine}</span>
              <div className="member_add_action">
              {generateActionLink()}
              </div>
              
            </div>
    )
}

Member.propTypes = {

}

export default Member
