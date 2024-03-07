import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

import "./App.css";
import Home from "./modules/Home";
import ProductList from "./modules/ProductList";
import Orders from "./modules/Orders";
import Account from "./modules/Account";
import Checkout from "./modules/Checkout";
import AlertPopup from "./components/AlertPopup";
import ProductDetails from "./components/Products/ProductDetails";
import SignIn from "./modules/SiginIn";
import SignUp from "./modules/SignUp";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AlertPopup />
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/:categoryId/products"
          element={<ProductList />}
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account/:email"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/:cartId"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:productId"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
