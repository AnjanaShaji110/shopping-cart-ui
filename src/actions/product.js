import axios from "../api/axios";
import { OPEN_ALERT_POPUP } from "./constants";

export const fetchProduct = async (dispatch, productId) => {
  try {
    const response = await axios.get(`/products/${productId}`);
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
export const addNewProduct = async (dispatch, product) => {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post("/cart", product, headers);
    dispatch({
      type: OPEN_ALERT_POPUP,
      payload: {
        type: "success",
        message: "Product added to cart",
      },
    });
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
