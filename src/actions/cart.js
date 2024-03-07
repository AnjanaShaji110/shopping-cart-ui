import axios from "../api/axios";
import { OPEN_ALERT_POPUP, SAVE_CART } from "./constants";

export const fetchCartList = async (dispatch, customerId) => {
  try {
    const response = await axios.get(`/cart/${customerId}`);
    let data;
    if (response.data.length > 0) {
      data = response.data[0];
    } else {
      data = {
        cartId: "",
        totalAmount: 0,
        products: [],
      };
    }
    dispatch({
      type: SAVE_CART,
      payload: {
        cart: data,
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
export const deleteCartItem = async (dispatch, CartItemId) => {
    try {
      const response = await axios.delete(`/cart/cartItem/${CartItemId}`);
      dispatch({
        type: OPEN_ALERT_POPUP,
        payload: {
          type: "success",
          message: "Item removed",
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
