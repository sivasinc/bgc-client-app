import {
    SET_SCREAMS,
    SET_POSTS,
    SET_POST,
    ADD_POST,
    SET_COMMUNITY,
    SET_USERS,
    SET_USER,
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
<<<<<<< HEAD
  import { addNewPost, getAPost } from '../../firebaseActions/dataServices';
=======
  import { addNewPost, getAPost, getUserProfileInfo , updateCommunityImage} from '../../firebaseActions/dataServices';
  import { editUserDetails } from '../actions/userActions';
>>>>>>> upstream/main
  import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
  import { storage } from "../../firebase";

  
  export const getPostDetails = (postId) => async (dispatch) => {
    // dispatch({ type: LOADING_UI });
    try {
      const result = await getAPost(postId);
      dispatch({
        type: SET_POST,
        payload: result
      });
    } catch(err) {
      console.log(err);
    } 
  };

  export const addAPostwithImage = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (newPost.sharedImage != "") {
        const storageRef = ref(storage, `images/${newPost.sharedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, newPost.sharedImage);
        uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }}, error => console.log(error.code), 
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      newPost.postPayload.sharedImg = downloadURL;
      const result = await addNewPost(newPost.postPayload);
      dispatch(getPostsOfCommunity);
      return dispatch(clearErrors());
    });
    }
  }
<<<<<<< HEAD
=======
  export const uploadProfileImage = (image, userDetails) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (image != "") {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }}, error => console.log(error.code), 
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      userDetails.imageUrl = downloadURL;
      dispatch(editUserDetails(userDetails));
      return dispatch(clearErrors());
    });
    }
  }

  export const uploadCommunityProfileImage = (image, currentCommunityId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    if (image != "") {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }}, error => console.log(error.code), 
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      const result = await updateCommunityImage(currentCommunityId, downloadURL);
      dispatch({ type: CLEAR_ERRORS });
      return dispatch(clearErrors());
    });
    }
  }

>>>>>>> upstream/main
  export const addAPost = (newPost) => async (dispatch) => {
    dispatch({ type: LOADING_UI });
    try {
      const result = await addNewPost(newPost.postPayload);
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
  