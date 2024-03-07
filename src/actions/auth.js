import axios from "../api/axios";
import { OPEN_ALERT_POPUP } from "./constants";

export const signIn = async (dispatch, login) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(`/auth/login`, login, headers);
    return response;
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
    return error;
  }
};
export const signUp = async (dispatch, signUp) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await axios.post(`/auth/signup`, signUp, headers);
      return response;
    } catch (error) {
      dispatch({
        type: OPEN_ALERT_POPUP,
        payload: {
          type: "error",
          message: error.message,
        },
      });
      return error;
    }
  };