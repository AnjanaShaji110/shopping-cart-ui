import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserAuthenticated = () => {
    const isAuthenticated =
      JSON.parse(localStorage.getItem("isAuthenticated")) || false;
    if (!isAuthenticated || isAuthenticated === "undefined") {
      setIsLoggedIn(false);
      return navigate("/login");
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserAuthenticated();
  }, [checkUserAuthenticated, isLoggedIn]);
  return <React.Fragment>{isLoggedIn ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
