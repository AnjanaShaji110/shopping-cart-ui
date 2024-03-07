import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/appContext";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import VerifiedIcon from '@mui/icons-material/Verified';

import { fetchOrders } from "../actions/order";
import CheckoutList from "../components/Checkout/CheckoutList";

const Orders = () => {
  const { dispatch, customerId } = useAppContext();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    fetchOrders(dispatch, customerId)
      .then((data) => {
        if (data && data.length > 0) {
          setOrders(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, customerId]);
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {orders
        ? orders.map((order, index) => (
            <Grid
              container
              spacing={3}
              key={order.OrderId}
              style={{ marginTop: "2px" }}
            >
              <Grid item xs={12} md={8} lg={9}>
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
                    {`Order #${index + 1}`}
                  </Typography>
                  <CheckoutList products={order.products} />
                </Paper>
              </Grid>
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
                    {`€ ${order.totalAmount}`}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1 }}>
                    on {order.createdAt}
                  </Typography>
                  {order.isdelivered === 0 ? (
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Delivered on - {order.arrivalDate}
                    </Typography>
                  ) : (
                    <Typography sx={{ flex: 1, fontWeight: "bold" }}>
                      Arrival date - {order.arrivalDate}
                    </Typography>
                  )}
                  <div>
                  <Typography sx={{ flex: 1, color:"Highlight" }}>
                      Cash on delivery {order.isdelivered === 0 ? <VerifiedIcon fontSize="large" color="success"/> : ""}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          ))
        :  <Typography
        variant="h3"
        gutterBottom
        style={{ padding: 10, textAlign: "center" }}
      >
        Your order list is empty
      </Typography>}
    </Container>
  );
};

export default Orders;
