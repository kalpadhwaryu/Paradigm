import axios from "axios";
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

export const listProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECTS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/projects`, config);

    dispatch({
      type: PROJECTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECTS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createProjectAction =
  (
    title,
    content,
    category,
    duration,
    clientName,
    clientEmail,
    clientPhone,
    status
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECTS_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/projects/create`,
        {
          title,
          content,
          category,
          duration,
          clientName,
          clientEmail,
          clientPhone,
          status,
        },
        config
      );

      dispatch({
        type: PROJECTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROJECTS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteProjectAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECTS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/projects/${id}`, config);

    dispatch({
      type: PROJECTS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PROJECTS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateProjectAction =
  (
    id,
    title,
    content,
    category,
    duration,
    clientName,
    clientEmail,
    clientPhone,
    status
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECTS_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/projects/${id}`,
        {
          title,
          content,
          category,
          duration,
          clientName,
          clientEmail,
          clientPhone,
          status,
        },
        config
      );

      dispatch({
        type: PROJECTS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PROJECTS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
