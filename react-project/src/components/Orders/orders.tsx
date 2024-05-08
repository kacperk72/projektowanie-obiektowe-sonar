import React, { useState } from "react";
import axios from "../../api/axios";

const Orders = () => {
  const initialOrderData = {
    customerName: "",
    address: "",
    phoneNumber: "",
    orderDetails: "",
  };

  const [orderData, setOrderData] = useState(initialOrderData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setMessage("");
    try {
      await axios.post("/orders", orderData);
      setMessage("Order placed successfully!");
      setOrderData(initialOrderData);
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Failed to place order.");
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Składanie Zamówienia</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerName">Imię i Nazwisko:</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={orderData.customerName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Adres:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={orderData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Numer Telefonu:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={orderData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="orderDetails">Szczegóły Zamówienia:</label>
          <textarea
            id="orderDetails"
            name="orderDetails"
            value={orderData.orderDetails}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Orders;
