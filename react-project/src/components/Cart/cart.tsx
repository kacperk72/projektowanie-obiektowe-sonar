import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface Item {
  id: number;
  name: string;
  price: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [total, setTotal] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    const itemsString = localStorage.getItem("cartItems");
    const items = itemsString ? JSON.parse(itemsString) : [];
    setCartItems(items);
    updateTotal(items);
  }, []);

  const updateTotal = (items: Item[]) => {
    const total = items.reduce((acc, item) => acc + item.price * 1, 0);
    setTotal(total);
  };

  const handlePayment = async () => {
    try {
      setCartItems([]);
      localStorage.setItem("cartItems", JSON.stringify([]));
      alert("Dziękujemy za płatność!");
      setPaymentComplete(true);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  if (paymentComplete) {
    return <Navigate to="/products" />;
  }

  return (
    <div>
      <h1>Koszyk</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price.toFixed(2)} zł
          </li>
        ))}
      </ul>
      <p>Suma: {total.toFixed(2)} zł</p>
      {cartItems.length > 0 && <button onClick={handlePayment}>Zapłać</button>}
    </div>
  );
};

export default Cart;
