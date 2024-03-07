import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

function Products(props) {
  const { product } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component={Link} to={`/product/${product.productId}`}>
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {product.productName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            € {product.price}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{
              width: "15%",
              objectFit: "contain",
              marginRight: "11px",
              display: { xs: "none", sm: "block" },
            }}
            image={`/static/images/products/${product.image}`}
            alt={product.imageLabel}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

Products.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productDetails: PropTypes.string.isRequired,
    productId:PropTypes.string.isRequired,
  }).isRequired,
};

export default Products;
