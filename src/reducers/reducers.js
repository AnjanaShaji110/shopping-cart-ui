import {
  CLOSE_CART_DIALOG_BOX,
  OPEN_CART_DIALOG_BOX,
  OPEN_ALERT_POPUP,
  CLOSE_ALERT_POPUP,
  SAVE_CART
} from "../actions/constants";

export const appReducer = (state, action) => {
  switch (action.type) {
    case OPEN_CART_DIALOG_BOX:
      return {
        ...state,
        openCartDialog: true,
      };
    case CLOSE_CART_DIALOG_BOX:
      return {
        ...state,
        openCartDialog: false,
      };
    case OPEN_ALERT_POPUP:
      return {
        ...state,
        openAlertPopup: true,
        alertType: action.payload.type,
        alertMessage: action.payload.message,
      };
    case CLOSE_ALERT_POPUP:
      return {
        ...state,
        openAlertPopup: false,
        alertType: "info",
        alertMessage: "",
      };
    case SAVE_CART:
      return {
        ...state,
        cart: action.payload.cart,
      };
    default:
      return state;
  }
};
