import {
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_CURRENT_TAB_INDEX,
  UPDATE_UI,
  SET_HEADER_ACTIVE,
} from "../types";

const initialState = {
  loading: false,
  errors: null,
  currentPage: null,
  currentTabIndex: 0,
  headerTabActive: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case SET_CURRENT_TAB_INDEX:
      return {
        ...state,
        currentTabIndex: action.payload,
      };
    case UPDATE_UI:
      return {
        ...state,
        currentPage: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
      };
    case SET_HEADER_ACTIVE:
      return {
        ...state,
        headerTabActive: action.payload,
      };
    default:
      return state;
  }
}
