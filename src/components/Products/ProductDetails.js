import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material";

import { addNewProduct, fetchProduct } from "../../actions/product";
import { useAppContext } from "../../context/appContext";

const defaultTheme = createTheme();

export default function ProductDetails() {
  const [quantity, setQuantity] = React.useState(0);
  const { dispatch, customerId } = useAppContext();
  const [product, setProduct] = useState([]);
  const { productId } = useParams();

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  const addToCart = (event) => {
    addNewProduct(dispatch, { customerId: customerId, productId, quantity });
  };

  useEffect(() => {
    fetchProduct(dispatch, productId)
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {});
  }, [dispatch, productId]);

  const buildOptions = () => {
    if (product.length > 0) {
      var arr = [];

      for (let i = 1; i <= product[0].quantity; i++) {
        arr.push(
          <MenuItem key={i} value={i}>
            {i}
          </MenuItem>
        );
      }

      return arr;
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        {product.length < 1 ? (
          <Typography
            variant="h3"
            gutterBottom
            style={{ padding: 10, textAlign: "center" }}
          >
            No Product found
          </Typography>
        ) : (
          <main>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              <Grid
                item
                xs={12}
                md={8}
                sx={{
                  "& .markdown": {
                    py: 3,
                  },
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {product[0].productName}
                </Typography>
                <img
                  src={`/static/images/products/${product[0].image}`}
                  alt={""}
                  loading="lazy"
                  style={{ width: "27%" }}
                />
                <Typography variant="h6" gutterBottom>
                  {"Description"}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {product[0].productDetails}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 260,
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
                    € {quantity > 0 ? product[0].price * quantity : product[0].price}
                  </Typography>
                  <Typography color="text.secondary" sx={{ flex: 1, mt: 2 }}>
                    {new Date().toLocaleString() + ""}
                  </Typography>
                  <FormControl sx={{ m: 1, minWidth: 120, mt: 2 }} size="small">
                    <InputLabel id="demo-select-small-label">
                      Quantity
                    </InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={quantity}
                      label="Quantity"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>
                        <em>0</em>
                      </MenuItem>
                      {buildOptions()}
                    </Select>
                  </FormControl>
                  <div style={{ marginTop: "12px" }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={addToCart}
                      disabled={!quantity}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </main>
        )}
      </Container>
    </ThemeProvider>
  );
}
