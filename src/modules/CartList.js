import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { deleteCartItem, fetchCartList } from "../actions/cart";
import { useAppContext } from "../context/appContext";
import { addNewProduct } from "../actions/product";

export default function CartList(props) {
  const { dispatch, customerId } = useAppContext();
  const { products } = props;

  const addProduct = (productId) => {
    addNewProduct(dispatch, {
      customerId: customerId,
      productId,
      quantity: 1,
    }).then((res) => {
      fetchCartList(dispatch, customerId);
    });
  };
  const removeCartItem = (cartItemId) => {
    console.log(cartItemId);
    deleteCartItem(
      dispatch,
      cartItemId
    ).then((res) => {
      fetchCartList(dispatch, customerId);
    });
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {products.length > 0
        ? products.map((value, index) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value.productId}
                disablePadding
                sx={{ marginTop: "15px" }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${value.productId}`}
                    src={`/static/images/products/${value.image}`}
                    //sx={{ width: 56, height: 56 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`${value.productName}`}
                  secondary={`€ ${value.price * value.quantity}`}
                />
                <ListItemButton
                  onClick={() => {
                    addProduct(value.productId);
                  }}
                >
                  <AddIcon />
                </ListItemButton>

                <ListItemText sx={{ border: "solid 1px", minWidth: 12 }}>
                  {value.quantity}
                </ListItemText>
                <ListItemButton
                  onClick={() => {
                    removeCartItem(value.CartItemId);
                  }}
                >
                  <RemoveIcon />
                </ListItemButton>
              </ListItem>
            );
          })
        : "Cart is Empty"}
    </List>
  );
}
