import {
  SET_SCREAMS,
  SET_COMMUNITY,
  SET_COMMUNITY_POSTS,
  SET_COMMUNITY_MEMBERS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  SET_CURRENT_PAGE
} from '../types';

const initialState = {
  screams: [],
  communities: [],
  communityPosts : [],
  scream: {},
  loading: true,
  isRefreshPost: false,
  currentPage: 'COMMUNITY',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
        isRefreshPost: false
      };
      case SET_COMMUNITY_MEMBERS:
        return {
          ...state,
          isRefreshPost: true
        };
    case SET_CURRENT_PAGE:
        return {
          ...state,
          currentPage: action.payload
        };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
      case SET_COMMUNITY:
        return {
          ...state,
          communities: action.payload,
          loading: false
        };
      case SET_COMMUNITY_POSTS:
          return {
            ...state,
            communityPosts: action.payload,
            isRefreshPost: false,
            loading: false
          };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
        isRefreshPost: true,
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
        isRefreshPost: true,
      };
    case POST_SCREAM:
      return {
        ...state,
        isRefreshPost: true,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        isRefreshPost: true,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
