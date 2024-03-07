import React from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";

import { useAppContext } from "../context/appContext";
import CartDialog from "./CartDialog";
import { fetchCartList } from "../actions/cart";
import { OPEN_CART_DIALOG_BOX } from "../actions/constants";

const Header = () => {
  const { dispatch, email, customerId } = useAppContext();
  const navigate = useNavigate();

  const isAuthenticated =
    JSON.parse(localStorage.getItem("isAuthenticated")) || false;
  const cartHandler = () => {
    fetchCartList(dispatch, customerId).then((res) => {
      dispatch({
        type: OPEN_CART_DIALOG_BOX,
      });
    });
  };
  const logout = () => {
    localStorage.removeItem("customerId");
    localStorage.removeItem("email");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CartDialog />
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon component={Link} to={"/"} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shopping Cart
          </Typography>
          {isAuthenticated ? (
            <div>
              <Button color="inherit" component={Link} to={"/"}>
                <HomeIcon />
              </Button>
              <Button color="inherit" component={Link} to={`/account/${email}`}>
                <AccountCircleIcon />
              </Button>
              <Button color="inherit" component={Link} to={"/orders"}>
                <StoreIcon />
              </Button>
              <Button color="inherit" onClick={cartHandler}>
                <ShoppingCartIcon />
              </Button>
              <Button color="inherit" onClick={logout}>
                <LogoutIcon />
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to={"/signup"}>
                Sign Up
              </Button>
              <Button color="inherit" component={Link} to={"/login"}>
                Sign In
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
