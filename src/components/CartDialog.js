import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAppContext } from "../context/appContext";
import { CLOSE_CART_DIALOG_BOX } from "../actions/constants";
import CartList from "../modules/CartList";

export default function CartDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { openCartDialog, dispatch, cart } = useAppContext();
  const navigate = useNavigate();

  const handleClose = () => {
    dispatch({
      type: CLOSE_CART_DIALOG_BOX,
    });
  };

  const checkout = () => {
    dispatch({
      type: CLOSE_CART_DIALOG_BOX,
    });
    navigate(`/checkout/${cart.cartId}`);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openCartDialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Cart List"}</DialogTitle>
        <DialogContent dividers={true}>
          <CartList products={cart.products} cartId={cart.cartId} />
        </DialogContent>
        <DialogContent dividers={true} sx={{ textAlign: "right" }}>
          {`Total Amount: € ${cart.totalAmount}`}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={checkout}
            autoFocus
            disabled={!cart.products.length > 0}
          >
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
