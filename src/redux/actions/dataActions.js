import {
  SET_SCREAMS,
  SET_COMMUNITY,
  SET_USERS,
  SET_COMMUNITY_MEMBERS,
  SET_COMMUNITY_POSTS,
  LOADING_MY_COMMUNITY,
  SET_MY_COMMUNITY,
  LOADING_JOIN_COMMUNITY,
  LOADING_USERS_POST,
  SET_RECOMMENDED_COMMUNITY,
  LOADING_RECOMMENDED_COMMUNITY,
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
  SET_CURRENT_COMMUNITY_ID
} from '../types';
import axios from 'axios';
import { getPostDetails } from './postActions';

// Post a scream
export const getPostCreateCommunity = (newMembers) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/community', newMembers)
    .then((res) => {
      dispatch({ type: SET_COMMUNITY_MEMBERS });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getRecommendedCommunity = () => async (dispatch) => {
  dispatch({ type: LOADING_RECOMMENDED_COMMUNITY });
  try {
    const result = await axios
    .get('/recommened/community');
      return dispatch({ type: SET_RECOMMENDED_COMMUNITY,
        payload: result.data });
  } catch(error) {
      return dispatch({
        type: SET_ERRORS,
        payload: error
      });
    }
};


// export const joinCommunity = (newCommunity) => (dispatch) => {
//   dispatch({ type: LOADING_JOIN_COMMUNITY, payload: true });
//   axios
//     .post('/community/join', newCommunity)
//     .then((res) => {
//       dispatch({ type: LOADING_JOIN_COMMUNITY,
//       payload: false });
//     })
//     .catch((err) => {
//       dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
//       dispatch({
//         type: SET_ERRORS,
//         payload: err
//       });
//     });
// };


export const joinCommunity = (newCommunity) => async (dispatch) => {
  dispatch({ type: LOADING_JOIN_COMMUNITY, payload: true });
  try {
    const result = await axios
    .post('/community/join', newCommunity);
    await Promise.all([dispatch(getRecommendedCommunity()), dispatch(getAllPostsOfUser()), dispatch(getAllCommunityOfUser())]);
    return dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
  } catch(error) {
    dispatch({ type: LOADING_JOIN_COMMUNITY, payload: false });
    return dispatch({
        type: SET_ERRORS,
        payload: error
      });
  }
};


// Get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/screams')
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      });
    });
};

// Get all screams
export const getPostsOfCommunity = (communityId) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const result = await axios
    .get(`/community/posts/${communityId}`);
     return dispatch({
        type: SET_COMMUNITY_POSTS,
        payload: result.data
      });
  } catch (err) {
      return dispatch({
        type: SET_COMMUNITY_POSTS,
        payload: []
      });
    };
};

export const getAllPostsOfUser = () => async (dispatch) => {
  dispatch({ type: LOADING_USERS_POST });
  try {
    const result = await axios
    .get('community/user/posts');
    return dispatch({
      type: SET_USERS_POSTS,
      payload: result.data
    });
  } catch(err) {
      return dispatch({
        type: SET_USERS_POSTS,
        payload: []
      });
    };
};

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

export const getAllCommunityOfUser = () => async (dispatch) => {
  dispatch({ type: LOADING_MY_COMMUNITY });
  try {
    const result = await axios
    .get('/community/user');
    return dispatch({
      type: SET_MY_COMMUNITY,
      payload: result.data
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
// Like a scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (postId, commentData) => (dispatch) => {
  axios
    .post(`/posts/${postId}/comment`, commentData)
    .then((res) => {
      // dispatch({
      //   type: SUBMIT_COMMENT,
      //   payload: res.data
      // });
      dispatch(getPostDetails(postId));
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
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

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const setCurrentCommunityId = (communityId) => (dispatch) => {
  dispatch({ type: SET_CURRENT_COMMUNITY_ID, payload: communityId });
};
