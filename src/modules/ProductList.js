import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import { useAppContext } from "../context/appContext";
import Products from "../components/Products/Products";
import { fetchProductsByCategory } from "../actions/category";

const ProductList = () => {
  const { dispatch } = useAppContext();
  const [categoryProducts, setCategoryProducts] = useState({});
  const { categoryId } = useParams();

  useEffect(() => {
    fetchProductsByCategory(dispatch, categoryId)
      .then((data) => {
        setCategoryProducts(data);
      })
      .catch((error) => {});
  }, [dispatch, categoryId]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, padding: 5 }}>
      {categoryProducts.category == null ||
      categoryProducts.products == null ? (
        <Typography
          variant="h3"
          gutterBottom
          style={{ padding: 10, textAlign: "center" }}
        >
          No Products found
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Paper
            sx={{
              position: "relative",
              backgroundColor: "grey.800",
              color: "#fff",
              mb: 4,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url(/static/images/categories/${categoryProducts?.category?.image})`,
            }}
          >
            {
              <img
                style={{ display: "none" }}
                src={`/static/images/categories/${categoryProducts?.category?.image}`}
                alt={"category"}
              />
            }
            <Box
              sx={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,.3)",
              }}
            />
            <Grid container>
              {categoryProducts?.category != null ? (
                <Grid item md={6}>
                  <Box
                    sx={{
                      position: "relative",
                      p: { xs: 3, md: 6 },
                      pr: { md: 0 },
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h3"
                      color="inherit"
                      gutterBottom
                    >
                      {categoryProducts?.category?.categoryName}
                    </Typography>
                    <Typography variant="h5" color="inherit" paragraph>
                      {categoryProducts?.category?.description}
                    </Typography>
                  </Box>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Paper>

          <Grid container spacing={4}>
            {categoryProducts?.products != null
              ? categoryProducts.products.map((product) => (
                  <Products key={product.productId} product={product} />
                ))
              : ""}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default ProductList;
