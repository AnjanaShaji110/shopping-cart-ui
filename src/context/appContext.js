import { createContext, useContext, useReducer } from "react";
import { appReducer } from "../reducers/reducers";

const initialState = {
  openCartDialog: false,
  openAlertDialog: false,
  alertMessage: "",
  alertType: "",
  cart: {
    cartId: "",
    totalAmount: 0,
    products: [],
  },
  email: "",
  customerId: "",
};
const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  initialState.email = localStorage.getItem("email");
  initialState.customerId = localStorage.getItem("customerId");
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
