// In App.js or where you set up your routes
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Services from "./components/Services/services.tsx";
import Products from "./components/Products/products.tsx";
import Orders from "./components/Orders/orders.tsx";
import Payments from "./components/Payments/payments.tsx";
import Cart from "./components/Cart/cart.tsx";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Services />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
