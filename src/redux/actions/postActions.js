import {
    SET_SCREAMS,
    SET_POSTS,
    SET_POST,
    ADD_POST,
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
  import { getPostsOfCommunity } from './dataActions';
  
  export const getPostDetails = (postId) => (dispatch) => {
    // dispatch({ type: LOADING_UI });
    axios
      .get(`/posts/${postId}`)
      .then((res) => {
        dispatch({
          type: SET_POST,
          payload: res.data
        });
        // dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };

  export const addAPostwithImage = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
    .post('/community/image', newPost.formData)
    .then((res) => {
        newPost.postPayload.sharedImg = res.data.imageUrl;
        axios
        .post('/posts', newPost.postPayload)
        .then((res) => {
          dispatch({
            type: ADD_POST,
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
    })
  };
  export const addAPost = (newPost) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
     const result = await axios
      .post('/posts', newPost.postPayload);
        dispatch(getPostsOfCommunity);
        return dispatch(clearErrors());
    } catch(err)  {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data
          });
        };
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
  