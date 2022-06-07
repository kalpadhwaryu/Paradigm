import {
  PROJECTS_CREATE_FAIL,
  PROJECTS_CREATE_REQUEST,
  PROJECTS_CREATE_SUCCESS,
  PROJECTS_DELETE_FAIL,
  PROJECTS_DELETE_REQUEST,
  PROJECTS_DELETE_SUCCESS,
  PROJECTS_LIST_FAIL,
  PROJECTS_LIST_REQUEST,
  PROJECTS_LIST_SUCCESS,
  PROJECTS_UPDATE_FAIL,
  PROJECTS_UPDATE_REQUEST,
  PROJECTS_UPDATE_SUCCESS,
} from "../constants/projectConstants";

export const projectListReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PROJECTS_LIST_REQUEST:
      return { loading: true };
    case PROJECTS_LIST_SUCCESS:
      return { loading: false, projects: action.payload };
    case PROJECTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECTS_CREATE_REQUEST:
      return { loading: true };
    case PROJECTS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PROJECTS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECTS_DELETE_REQUEST:
      return { loading: true };
    case PROJECTS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PROJECTS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const projectUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECTS_UPDATE_REQUEST:
      return { loading: true };
    case PROJECTS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PROJECTS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
