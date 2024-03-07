import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../context/appContext";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import CheckoutList from "../components/Checkout/CheckoutList";
import Address from "../components/Checkout/Address";
import { fetchCustomerByEmail } from "../actions/customer";
import { fetchCartList } from "../actions/cart";
import { createOrder } from "../actions/order";

const Checkout = () => {
  const { dispatch, cart, customerId, email } = useAppContext();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const placeOrder = () => {
    createOrder(dispatch, {
      customerId: customerId,
      cartId: cart.cartId,
    }).then((res) => {
      navigate("/orders");
    }).catch(err=>{});
  };

  useEffect(() => {
    fetchCustomerByEmail(dispatch, email)
      .then((data) => {
        if (data.length > 0) {
          setUser(data[0]);
        }
        fetchCartList(dispatch, customerId);
      })
      .catch((err) => {});
  }, [dispatch, customerId, email]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {cart.products.length < 1 ? (
        <Typography
          variant="h3"
          gutterBottom
          style={{ padding: 10, textAlign: "center" }}
        >
          No Items to Checkout, Please add items
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            {user ? (
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                >
                  Address
                </Typography>
                <Address user={user} />
              </Paper>
            ) : (
              ""
            )}
          </Grid>
          {/* Recent Deposits */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 240,
              }}
            >
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Total Amount
              </Typography>
              <Typography component="p" variant="h4">
                {`€ ${cart.totalAmount}`}
              </Typography>
              <Typography color="text.secondary" sx={{ flex: 1 }}>
                {"On " + new Date().toLocaleString() + ""}
              </Typography>
              <div>
                <Button
                  variant="contained"
                  size="small"
                  onClick={placeOrder}
                  //disabled={!quantity}
                >
                  Place Order
                </Button>
              </div>
            </Paper>
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                Cart List
              </Typography>
              <CheckoutList products={cart.products} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Checkout;
