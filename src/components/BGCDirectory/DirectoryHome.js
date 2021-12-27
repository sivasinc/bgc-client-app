import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./DirectoryHome.css";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Fuse from "fuse.js";
import Member from "./Member";
import {
  getAllMemberData,
  addMemberToNetwork,
} from "../../redux/actions/dataActions";
import Navigation from "../layout/Navigation";
import Pagination from "@mui/material/Pagination";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import {
  updateTabIndex,
  setActiveHeader,
} from "../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const DirectoryHome = ({
  members,
  getMemberData,
  addMemberToMyNetwork,
  setActiveHeader,
  user: { userInfo },
  loadingMembers,
}) => {
  const [searchItems, setSearchItem] = useState(
    members && Array.isArray(members) ? members : []
  );
  const [openModel, setOpenModel] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getMemberData();
  }, []);

  useEffect(() => {
    if (members && Array.isArray(members) && members.length > 0) {
      setSearchItem(members);
    }
  }, [loadingMembers]);

  const addMemberHandler = (email) => {
    addMemberToMyNetwork(email);
  };
  const { myNetworks } = userInfo;
  const [pageNumber, setPageNumber] = useState(1);
  const limit = 20;
  const [pagesPerPage] = React.useState(Math.ceil(myNetworks.length / limit));

  let filteredList = [];
  if (myNetworks && Array.isArray(myNetworks) && myNetworks.length > 0) {
    filteredList = myNetworks.slice(0, 4);
  }
  const myNetworkClickHandler = (email) => {
    const memberId = members
      .filter((x) => x.email === email)
      .map((y) => y.memberId);
    setActiveHeader(false);
    history.push(`/userProfile/${memberId}`);
  };

  const handleMyNetwork = () => {
    if (myNetworks.length > 0) {
      setOpenModel(!openModel);
    }
  };
  const handleChangePage = (e, value) => {
    setPageNumber(value);
  };

  const searchDirectoryHandler = (query) => {
    const fuse = new Fuse(members, {
      keys: ["firstName", "lastName", "headLine"],
      includeScore: true,
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
  };
  console.log("searchItems", searchItems);
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
              fullWidth
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
            <span
              className="directory__header_MyNetworkLabel"
              component={Link}
              onClick={handleMyNetwork}
            >
              View My Network
            </span>
            <span>
              {myNetworks && Array.isArray(myNetworks) ? myNetworks.length : 0}{" "}
              Connections
            </span>
            <Dialog
              open={openModel}
              onClose={() => setOpenModel(false)}
              fullWidth
              maxWidth="md"
            >
              <DialogTitle>
                <span className="mynnet"> My Network </span>

                <span className="mynCon">{myNetworks.length}Connections</span>
              </DialogTitle>

              <DialogContent>
                <div className="mySplit">
                  {myNetworks
                    .slice((pageNumber - 1) * limit, limit * pageNumber)
                    .map((item) => (
                      <div className="myNetworks__social__form_names">
                        <div
                          className="MyCommunity__body_item"
                          onClick={() => myNetworkClickHandler(item.email)}
                        >
                          <Avatar
                            alt="Remy Sharp"
                            className="myNetwork__dailogue_img"
                            src={item.imageUrl}
                          />

                          <div className="mynModal">
                            <div
                              className="myNetworks__item_description_title"
                              onClick={() => myNetworkClickHandler(item.email)}
                            >
                              {item.firstName} {item.lastName}{" "}
                            </div>
                            <div className="myNetworks__item_description">
                              {item.headLine}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </DialogContent>
              <DialogActions>
                <Pagination
                  rowsPerPageOptions={[]}
                  component="div"
                  count={pagesPerPage}
                  rowsPerPage={limit}
                  page={pageNumber}
                  onChange={handleChangePage}

                  // onChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <Button
                  onClick={() => setOpenModel(!openModel)}
                  color="primary"
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="directory_body">
          {searchItems.map((member, index) => (
            <Member
              member={member}
              myNetworks={myNetworks}
              key={index}
              addMemberHandler={addMemberHandler}
            />
          ))}
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
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  getMemberData: () => dispatch(getAllMemberData()),
  addMemberToMyNetwork: (email) => dispatch(addMemberToNetwork(email)),
  setActiveHeader: (value) => dispatch(setActiveHeader(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(DirectoryHome);
