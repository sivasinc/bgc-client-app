import {
  SET_SCREAMS,
  SET_COMMUNITY,
  SET_USERS,
  SET_COMMUNITY_MEMBERS,
  SET_COMMUNITY_POSTS,
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
} from '../types';
import axios from 'axios';


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

// Post a scream
export const getPostJoinCommunity = (newCommunity) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/community/join', newCommunity)
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
export const getPostsOfCommunity = (communityId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  console.log('getScreamsOfCommunity', communityId);
  axios
    .get(`/community/posts/${communityId}`)
    .then((res) => {
      dispatch({
        type: SET_COMMUNITY_POSTS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_COMMUNITY_POSTS,
        payload: []
      });
    });
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
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
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

export const setCurrentPage = (currentPage) => (dispatch) => {
  dispatch({ type: SET_CURRENT_PAGE, payload: currentPage });
};
