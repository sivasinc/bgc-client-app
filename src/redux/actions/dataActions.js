import {
  SET_SCREAMS,
  SET_COMMUNITY,
  SET_USERS,
  SET_USER,
  SET_COMMUNITY_MEMBERS,
  SET_COMMUNITY_POSTS,
  LOADING_MY_COMMUNITY,
  SET_MY_COMMUNITY,
  LOADING_JOIN_COMMUNITY,
  LOADING_USERS_POST,
  SET_RECOMMENDED_COMMUNITY,
  LOADING_RECOMMENDED_COMMUNITY,
  LOADING_USERS_COMMUNITY,
  SET_ALL_USERS_COMMUNITY,
  SET_REFRESH_COMMUNITY,
  SET_USERS_POSTS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  SET_ERRORS,
  POST_SCREAM,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
  SET_CURRENT_PAGE,
  SET_CURRENT_COMMUNITY_ID,
  SET_MEMBERS,
  LOADING_MEMBERS
} from '../types';
import axios from 'axios';
import { getPostDetails } from './postActions';
import {
  getAllRecommenededCommunities,
  getAllUserMemberCommunityPost,
  myCommunity,
  joinACommunity,
  leaveMemberFromCommunity,
  getAllCommunityPosts,
  commentOnAPost,
  addAReportToPost,
  getAPost,
  likeAPost,
  disLikeAPost,
  getAllMembers,
  addMemberToMyNetwork,
  getUserProfileInfo,
  getAllCommunities,
  addNewCommunity,
} from "../../firebaseActions/dataServices";

export const createCommunity = (newCommunity, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const result = await addNewCommunity(newCommunity);
    dispatch(setCurrentCommunityId(result));
    history.push(`/communityHome/${result}`);
    dispatch({ type: CLEAR_ERRORS });
  }
  catch(error) {
    console.log('error');
    dispatch({
      type: SET_ERRORS,
      payload: error
    });
  }
};

export const getAllUsersCommunity = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_USERS_COMMUNITY });
  try {
    const { user } = getState();
    console.log(user);
    const result = await getAllCommunities(user);
      return dispatch({ type: SET_ALL_USERS_COMMUNITY,
        payload: result });
    }
    catch(error) {
      return dispatch({
        type: SET_ERRORS,
        payload: error
      });
    }
  };

export const getRecommendedCommunity = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_RECOMMENDED_COMMUNITY });
  try {
    const { user: { userInfo } } = getState();
    const result = await getAllRecommenededCommunities(userInfo);
      return dispatch({ type: SET_RECOMMENDED_COMMUNITY,
        payload: result });
    }
    catch(error) {
      return dispatch({
        type: SET_ERRORS,
        payload: error
      });
    }
  };


  export const joinCommunity = (newCommunity) => async (dispatch, getState) => {
    dispatch({ type: LOADING_JOIN_COMMUNITY, payload: true });
    try {
      const {
        user: { userInfo },
      } = getState();
      const result = await joinACommunity(userInfo, newCommunity);
      await Promise.all([
        dispatch(getRecommendedCommunity(userInfo)),
        dispatch(getAllCommunityOfUser(userInfo)),
        dispatch(getAllPostsOfUser(userInfo)),
        dispatch(getAllUsersCommunity()),
        dispatch(getPostsOfCommunity(newCommunity)),
      ]);
      return dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
    } catch (error) {
      dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
      return dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    }
  };

// Join Community From Community Details
  export const joinCommunityFromDetails = (newCommunity) => async (dispatch, getState) => {
    dispatch({ type: LOADING_JOIN_COMMUNITY, payload: true });
    try {
      const {
        user: { userInfo },
      } = getState();
      const result = await joinACommunity(userInfo, newCommunity);
      await Promise.all([
        dispatch(getPostsOfCommunity(newCommunity)),
      ]);
      return dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
    } catch (error) {
      dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
      return dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    }
  };


  // Join Community From Community Details
  export const leaveCommunityFromDetails = (newCommunity) => async (dispatch, getState) => {
    dispatch({ type: LOADING_JOIN_COMMUNITY, payload: true });
    try {
      const {
        user: { userInfo },
      } = getState();
      const result = await leaveMemberFromCommunity(userInfo, newCommunity);
      await Promise.all([
        dispatch(getPostsOfCommunity(newCommunity)),
      ]);
      return dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
    } catch (error) {
      dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
      return dispatch({
        type: SET_ERRORS,
        payload: error,
      });
    }
  };


// Get all screams
export const getPostsOfCommunity = (communityId) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const result = await getAllCommunityPosts(communityId)
     return dispatch({
        type: SET_COMMUNITY_POSTS,
        payload: result
      });
  } catch (err) {
      return dispatch({
        type: SET_COMMUNITY_POSTS,
        payload: []
      });
    };
};

export const getAllPostsOfUser = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_USERS_POST });
  try {
    const { user: { userInfo } } = getState();
    const result = await getAllUserMemberCommunityPost(userInfo)
    return dispatch({
      type: SET_USERS_POSTS,
      payload: result
    });
  } catch(err) {
      return dispatch({
        type: SET_USERS_POSTS,
        payload: []
      });
    };
};

// export const getAllPostsOfUser = () => async (dispatch) => {
//   dispatch({ type: LOADING_USERS_POST });
//   try {
//     const result = await axios
//     .get('community/user/posts');
//     return dispatch({
//       type: SET_USERS_POSTS,
//       payload: result.data
//     });
//   } catch(err) {
//       return dispatch({
//         type: SET_USERS_POSTS,
//         payload: []
//       });
//     };
// };

// Get all community
export const getAllCommunity = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/community')
    .then((res) => {
      dispatch({
        type: SET_COMMUNITY,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_COMMUNITY,
        payload: []
      });
    });
};

export const getAllCommunityOfUser = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_MY_COMMUNITY });
  try {
    const { user: { userInfo } } = getState();
    const result = await myCommunity(userInfo)
    return dispatch({
      type: SET_MY_COMMUNITY,
      payload: result
    });
  } catch (err) {
      dispatch({
        type: SET_MY_COMMUNITY,
        payload: []
      });
    };
};




// Get all community
export const getAllUsers = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/users')
    .then((res) => {
      dispatch({
        type: SET_USERS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_USERS,
        payload: []
      });
    });
};

export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/scream', newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const addReportsPost = (postId, source) => async (dispatch, getState) => {
   
  const { data } = getState();
  try { 
    await addAReportToPost(postId,source);
    if(source === 'home') {
      dispatch(getAllPostsOfUser());
    } else {
      const { currentCommunityId } = data;
      dispatch(getPostsOfCommunity(currentCommunityId));
    }
    dispatch(clearErrors());
  } catch(error) {
    dispatch({
      type: SET_ERRORS,
      payload: error
    });
  }
};

export const likePost = (postId, source) => async (dispatch, getState) => {
  const { user: { userInfo }, data } = getState();
  try {
    const { email } = userInfo;
    const result = await likeAPost({
      postId,
      email
    });
    if(source === 'home') {
      dispatch(getAllPostsOfUser());
    } else {
      const { currentCommunityId } = data;
      dispatch(getPostsOfCommunity(currentCommunityId));
    }
    dispatch(clearErrors());
  } catch(error) {
    dispatch({
      type: SET_ERRORS,
      payload: error
    });
  }
};

export const dislikePost = (postId, source) => async (dispatch, getState) => {
  const { user: { userInfo }, data } = getState();
  try {
    const { email } = userInfo;
    const result = await disLikeAPost({
      postId,
      email
    });
    if(source === 'home') {
      dispatch(getAllPostsOfUser());
    } else {
      const { currentCommunityId } = data;
      dispatch(getPostsOfCommunity(currentCommunityId));
    }
   
    dispatch(clearErrors());
  } catch(error) {
    dispatch({
      type: SET_ERRORS,
      payload: error
    });
  }
};

// Submit a comment
export const submitComment = (postId, commentData) => async (dispatch) => {
  try {
    const result = await commentOnAPost(commentData);
    dispatch(getPostDetails(postId));
    dispatch(clearErrors());
  } catch(err) {
      dispatch({
        type: SET_ERRORS,
        payload: err
      });
    };
};
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then(() => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch(() => {
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};

export const getAllMemberData = () => async (dispatch, getState) => {
  dispatch({ type: LOADING_MEMBERS });
   try {
    const { user: { userInfo } } = getState();
     const result = await getAllMembers(userInfo);
     dispatch({
      type: SET_MEMBERS,
      payload: result
     })
   }
    catch(error) {
      dispatch({
        type: SET_MEMBERS,
        payload: null
      });
    }
};

export const addMemberToNetwork = (email) => async (dispatch, getState) => {
  dispatch({ type: LOADING_DATA });
  try {
    const {
      user: { userInfo },
      data: { members },
    } = getState();
    const newMember = members.filter((item) => item.email === email);
    if (newMember.length > 0) {
      const result = await addMemberToMyNetwork(userInfo, newMember[0]);
      const userProfile = await getUserProfileInfo(userInfo.email);
      dispatch({ type: CLEAR_ERRORS });
      dispatch({
        type: SET_USER,
        payload: userProfile,
      });
    }
  } catch (error) {
    dispatch({
      type: SET_MEMBERS,
      payload: null,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setCurrentCommunityId = (communityId) => (dispatch) => {
  dispatch({ type: SET_CURRENT_COMMUNITY_ID, payload: communityId });
};
