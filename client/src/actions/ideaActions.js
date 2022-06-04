import axios from "axios";
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

export const listIdeas = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: IDEAS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/ideas`, config);

    dispatch({
      type: IDEAS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: IDEAS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createIdeaAction =
  (title, content, category, duration) => async (dispatch, getState) => {
    try {
      dispatch({
        type: IDEAS_CREATE_REQUEST,
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
        `/api/ideas/create`,
        { title, content, category, duration },
        config
      );

      dispatch({
        type: IDEAS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: IDEAS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteIdeaAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: IDEAS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/ideas/${id}`, config);

    dispatch({
      type: IDEAS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: IDEAS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateIdeaAction =
  (id, title, content, category, duration) => async (dispatch, getState) => {
    try {
      dispatch({
        type: IDEAS_UPDATE_REQUEST,
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
        `/api/ideas/${id}`,
        { title, content, category, duration },
        config
      );

      dispatch({
        type: IDEAS_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: IDEAS_UPDATE_FAIL,
        payload: message,
      });
    }
  };
