import axios from "../api/axios";
import { OPEN_ALERT_POPUP } from "./constants";

export const fetchCustomerByEmail = async (dispatch, email) => {
  try {
    const response = await axios.get(`/customers/${email}`);
    return response.data;
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};
export const updateCustomerDetails = async (dispatch, customer, email) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.put(`customers/${email}`, customer, headers);
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "success",
        message: "Deatils are updated",
      },
    });
    return response;
  } catch (error) {
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "error",
        message: error.message,
      },
    });
  }
};
