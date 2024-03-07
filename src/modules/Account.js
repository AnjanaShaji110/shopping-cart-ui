import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useAppContext } from "../context/appContext";
import { fetchCustomerByEmail, updateCustomerDetails } from "../actions/customer";

export default function Account() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    zip: "",
  });
  const { email } = useParams();
  const { dispatch } = useAppContext();

  const onChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    fetchCustomerByEmail(dispatch, email)
      .then((data) => {
        if (data.length > 0) {
          setUser(data[0]);
        }
      })
      .catch((err) => {});
  }, [dispatch, email]);

  const updateUserDetails = () => {
    updateCustomerDetails(dispatch, user, email);
  };

  return (
    <React.Fragment>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      {user ? (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography variant="h6" gutterBottom>
              Shipping address
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  value={user.firstName}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={user.lastName}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="street"
                  name="street"
                  label="Street"
                  fullWidth
                  autoComplete="shipping address-line"
                  variant="standard"
                  value={user.street}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                  value={user.city}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                  value={user.zip}
                  InputLabelProps={{ shrink: true }}
                  onChange={onChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" onClick={updateUserDetails}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}
