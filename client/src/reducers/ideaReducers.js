import {
  IDEAS_CREATE_FAIL,
  IDEAS_CREATE_REQUEST,
  IDEAS_CREATE_SUCCESS,
  IDEAS_DELETE_FAIL,
  IDEAS_DELETE_REQUEST,
  IDEAS_DELETE_SUCCESS,
  IDEAS_LIST_FAIL,
  IDEAS_LIST_REQUEST,
  IDEAS_LIST_SUCCESS,
  IDEAS_UPDATE_FAIL,
  IDEAS_UPDATE_REQUEST,
  IDEAS_UPDATE_SUCCESS,
} from "../constants/ideaConstants";

export const ideaListReducer = (state = { ideas: [] }, action) => {
  switch (action.type) {
    case IDEAS_LIST_REQUEST:
      return { loading: true };
    case IDEAS_LIST_SUCCESS:
      return { loading: false, ideas: action.payload };
    case IDEAS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ideaCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case IDEAS_CREATE_REQUEST:
      return { loading: true };
    case IDEAS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case IDEAS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const ideaDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case IDEAS_DELETE_REQUEST:
      return { loading: true };
    case IDEAS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case IDEAS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const ideaUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case IDEAS_UPDATE_REQUEST:
      return { loading: true };
    case IDEAS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case IDEAS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
