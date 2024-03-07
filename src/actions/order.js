import axios from "../api/axios";
import { OPEN_ALERT_POPUP } from "./constants";

export const fetchOrders = async (dispatch, customerId) => {
  try {
    const response = await axios.get(`/order/${customerId}`);
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
export const createOrder = async (dispatch, orderDetails) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(`order`, orderDetails, headers);
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "success",
        message: "Order has placed",
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
    return error;
  }
};
