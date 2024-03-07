import axios from "../api/axios";
import { OPEN_ALERT_POPUP } from "./constants";

export const fetchCategories = async (dispatch) => {
    try {
      const response = await axios.get("/categories");
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
  export const fetchProductsByCategory = async (dispatch, categoryId) => {
    try {
      const response = await axios.get(`categories/${categoryId}/products`);
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