import React, { useState } from "react";
import axios from "../../api/axios";

const Payments = () => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      await axios.post("/payments", paymentData);
      setMessage("Payment successful!");
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed.");
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h1>Proces płatności</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardNumber">Numer karty:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentData.cardNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="expiryDate">Data ważności:</label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={paymentData.expiryDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={paymentData.cvv}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Kwota:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Przetwarzanie..." : "Zapłać"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Payments;
