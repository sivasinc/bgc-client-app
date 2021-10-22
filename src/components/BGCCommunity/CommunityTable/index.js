import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CommunityCreateDailog from "../CommunityDailog";
import {
  setCurrentCommunityId,
  getRecommendedCommunity,
  getAllUsersCommunity,
  joinCommunity,
  getAllCommunityOfUser,
  getAllPostsOfUser,
} from "../../../redux/actions/dataActions";
import { updateTabIndex } from "../../../redux/actions/userActions";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Fuse from "fuse.js";
import LoadingButton from "@mui/lab/LoadingButton";

const CommunityTable = ({
  myCommunities,
  loadingMyCommunities,
  allUsersCommunities,
  setCurrentCommunityId,
  updateTabIndex,
  user: { userInfo },
  loading,
  usersPosts,
  getAllPostOfUserMemberCommunity,
  joinACommunity,
  getAllRecommendedCommunities,
  getAllUsersCommunities,
  recommendedCommunities,
  isRefreshCommunity,
  getAllUserCommunities,
  allUsersCommunitiesLoading,
  recommendedCommunityLoading,
  joinCommunityLoading,
  loadingUsersPosts,
}) => {
  const history = useHistory();

  useEffect(() => {
    const { email } = userInfo;
    if (email !== undefined) {
      getAllUsersCommunities();
    }
  }, []);

  const [searchItems, setSearchItem] = useState(
    allUsersCommunities && Array.isArray(allUsersCommunities)
      ? allUsersCommunities
      : []
  );

  useEffect(() => {
    if (
      allUsersCommunities &&
      Array.isArray(allUsersCommunities) &&
      allUsersCommunities.length > 0
    ) {
      setSearchItem(allUsersCommunities);
    }
  }, [allUsersCommunitiesLoading]);

  const [updateCommunityId, setUpdatedCommunityId] = useState("");

  const communityClickHandler = (communityId) => {
    console.log("communityClickHandler");
    history.push("/communityHome");
    setCurrentCommunityId(communityId);
    // updateTabIndex(3);
  };

  const joinCommunityHandler = (communityId) => {
    console.log("communityId", communityId);
    setUpdatedCommunityId(communityId);
    joinACommunity(communityId);
  };

  const searchCommunityHandler = (query) => {
    const fuse = new Fuse(allUsersCommunities, {
      keys: ["name", "description"],
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
      setSearchItem(allUsersCommunities);
    }
  };
  console.log("searchItems", searchItems);

  const { email } = userInfo;

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const generateActionLink = (community) => {
    if (joinCommunityLoading && updateCommunityId === community.communityId) {
      return (
        <React.Fragment>
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>
        </React.Fragment>
      );
    } else if (
      (community &&
        community.members &&
        community.members.length > 0 &&
        community.members.filter((member) => member.email === email).length >
          0) ||
      (updateCommunityId && updateCommunityId === community.communityId)
    ) {
      return (
        <React.Fragment>
          <CheckIcon
          // onClick={() => joinCommunityHandler(community.communityId)}
          />{" "}
          <span
            // onClick={() => joinCommunity(email)}
            className="member_add_action_label"
          >
            JOINED
          </span>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <AddIcon
            onClick={() => joinCommunityHandler(community.communityId)}
          />{" "}
          <span
            onClick={() => joinCommunityHandler(community.communityId)}
            className="member_add_action_label"
          >
            JOIN
          </span>
        </React.Fragment>
      );
    }
  };

  return (
    <div className="all_community_container">
      <div className="all_communityBox_header">
        <h2>All Alumnae Communities</h2>
      </div>
      <div className="search_community__header">
        <div className="search_community_left">
          <TextField
            label="Search Community"
            id="outlined-start-adornment"
            className="search_community_searchBar"
            onChange={(e) => searchCommunityHandler(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div>
          <CommunityCreateDailog />
        </div>
      </div>

      <TableContainer
        sx={{ width: "auto", margin: "0px 20px 20px 20px", display: "flex" }}
        component={Paper}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left"> </TableCell>
              <TableCell align="left" sortDirection="asc" color="primary">
                Community Name
              </TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Members</TableCell>
              <TableCell align="left"> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchItems.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Avatar
                    aria-label="recipe"
                    alt="Remy Sharp"
                    className="MyCommunity__body_item__image"
                    src={row.image}
                  />
                </TableCell>
                <TableCell align="left">
                  <p>
                    <Link
                      to={`/communityHome/${row.communityId}`}
                      onClick={() => communityClickHandler(row.communityId)}
                    >
                      {row.name}
                    </Link>
                  </p>
                </TableCell>
                <TableCell align="left" padding="30px;">
                  {row.description}
                </TableCell>
                <TableCell align="left">
                  {row.members && Array.isArray(row.members)
                    ? row.members.length
                    : 0}
                </TableCell>
                <TableCell align="center">
                  <div className="member_add_action">
                    {generateActionLink(row)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

CommunityTable.propTypes = {};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    user: state.user,
    loadingMyCommunities: state.data.loadingMyCommunities,
    allUsersCommunities: state.data.allUsersCommunities,
    usersPosts: state.data.usersPosts,
    isRefreshCommunity: state.data.isRefreshCommunity,
    recommendedCommunities: state.data.recommendedCommunities,
    myCommunities: state.data.myCommunities,
    recommendedCommunityLoading: state.data.recommendedCommunityLoading,
    joinCommunityLoading: state.data.joinCommunityLoading,
    loadingUsersPosts: state.data.loadingUsersPosts,
    allUsersCommunitiesLoading: state.data.allUsersCommunitiesLoading
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllPostOfUserMemberCommunity: () => dispatch(getAllPostsOfUser()),
  getAllUserCommunities: () => dispatch(getAllCommunityOfUser()),
  getAllRecommendedCommunities: () => dispatch(getRecommendedCommunity()),
  getAllUsersCommunities: () => dispatch(getAllUsersCommunity()),
  joinACommunity: (communityId) => dispatch(joinCommunity(communityId)),
  setCurrentCommunityId: (communityId) =>
    dispatch(setCurrentCommunityId(communityId)),
  updateTabIndex: (tabIndex) => dispatch(updateTabIndex(tabIndex)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunityTable);