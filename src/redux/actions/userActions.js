import { signIn, signUpUserWithEmail } from '../../firebaseActions/service';
import {getUserProfileInfo} from '../../firebaseActions/dataServices';


import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_AUTHENTICATED,
  SET_CURRENT_TAB_INDEX,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIONS_READ,
  SET_CURRENT_COMMUNITY_IMAGE
} from '../types';
import axios from 'axios';


export const updatePage = (pageName) => (dispatch) => {
  dispatch({ type: LOADING_UI, payload: pageName });
};

export const updateTabIndex = (index) => (dispatch) => {
  dispatch({ type: SET_CURRENT_TAB_INDEX, payload: index });
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
    const user = {
      email: userData.email,
      password: userData.password,
    };
    signIn(user)
      .then((result) => {
        dispatch({ type: CLEAR_ERRORS });
             dispatch({
        type: SET_USER,
        payload: result
      });
      dispatch({ type: SET_CURRENT_TAB_INDEX, payload: 1 });
      history.push('/portalHome');
      })
      .catch((error) => {
        dispatch({
          type: SET_ERRORS,
          payload: error.message
        });
      });
};

export const signupUser = (newUserData, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const result = await signUpUserWithEmail(newUserData);
    dispatch({ type: CLEAR_ERRORS });
  } catch(err) {
    console.log('error1', err);
      dispatch({
        type: SET_ERRORS,
        payload: err
      });
    };
};

export const getUserProfileData = () => async (dispatch, getState) => {
  try {
    const { user } = getState();
    const result = await getUserProfileInfo(user.email);
  }
  catch(err) {
    console.log(err);
  } 
};

// export const signupUser = (newUserData, history) => (dispatch) => {
//   dispatch({ type: LOADING_UI });
//   axios
//     .post('/signup', newUserData)
//     .then((res) => {
//       setAuthorizationHeader(res.data.token);
//       dispatch(getUserData());
//       dispatch({ type: CLEAR_ERRORS });
//       history.push('/userprofile');
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: err.response.data
//       });
//     });
// };

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async (dispatch) => {
  axios
    .get('/user')
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const uploadCommunityImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/community/image', formData)
    .then((res) => {
      console.log('res', res);
      dispatch({ type: SET_CURRENT_COMMUNITY_IMAGE, payload: res.data.imageUrl });
    })
    .catch((err) => console.log(err));
};

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios
    .post('/user', userDetails)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => console.log(err));
};

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};
const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers["content-type"] = "application/json";
  axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};