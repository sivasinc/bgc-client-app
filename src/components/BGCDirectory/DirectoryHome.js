import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import "./DirectoryHome.css";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Fuse from 'fuse.js';
import Member from './Member';
import {getAllMemberData, addMemberToNetwork } from '../../redux/actions/dataActions';
import Navigation from "../layout/Navigation";


const DirectoryHome = ({members, getMemberData, addMemberToMyNetwork, user: { userInfo }, loadingMembers}) => {
  const [searchItems, setSearchItem] = useState(members && Array.isArray(members) ? members : []);
    useEffect(() => {
        getMemberData();
    }, [])

    useEffect(() => {
      if(members && Array.isArray(members) && members.length > 0) {
        setSearchItem(members);
      }
    }, [loadingMembers])

    const addMemberHandler = (email) => {
        addMemberToMyNetwork(email);
    }
    const { myNetworks } = userInfo;

const searchDirectoryHandler = (query) => {
  const fuse = new Fuse(members, { 
    keys: ["firstName", "lastName", "headLine"],
    includeScore: true   
});    
const result = fuse.search(query);
const finalResult = [];
if (result.length) {
 result.forEach((item) => {
   finalResult.push(item.item);
 });
 setSearchItem(finalResult);
} else {
  setSearchItem(members);
}
}
console.log('searchItems', searchItems);
  return (
    <React.Fragment>
    <div className="directory_container">
      <h4>Alumnae Directory</h4>
      <div className="directory__header">
        <div className="directory__header_left">
          <TextField
            label="Search Directory"
            id="outlined-start-adornment"
            className="directory__header_searchBar"
            onChange={(e) => searchDirectoryHandler(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="directory__header_right">
          <span className="directory__header_MyNetworkLabel">
            View My Network
          </span>
          <span>{myNetworks && Array.isArray(myNetworks) ? myNetworks.length : 0 } Connections</span>
        </div>
      </div>
        <div className="directory_body">
          {
              searchItems.map((member, index) => <Member member={member} 
              myNetworks={myNetworks} key={index} 
              addMemberHandler={addMemberHandler} />)
          }
           </div>   
    </div>
    </React.Fragment>
  );
};

DirectoryHome.propTypes = {};
const mapStateToProps = (state) => {
    return {
        members: state.data.members,
        loadingMembers: state.data,
        user: state.user
    } 
}
const mapDispatchToProps = (dispatch) => ({
    getMemberData: () => dispatch(getAllMemberData()),
    addMemberToMyNetwork: (email) => dispatch(addMemberToNetwork(email)),
})
export default connect(mapStateToProps, mapDispatchToProps) (DirectoryHome);
