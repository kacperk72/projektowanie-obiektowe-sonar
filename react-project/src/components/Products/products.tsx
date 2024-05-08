import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { useCart } from "../../CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface CartProduct extends Product {
  quantity: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    const existingCart = JSON.parse(
      localStorage.getItem("cartItems") || "[]"
    ) as CartProduct[];
    const itemExists = existingCart.find((item) => item.id === product.id);
    const newCart = itemExists
      ? existingCart.map((item) =>
          item.id === product.id ? { ...item } : item
        )
      : [...existingCart, { ...product }];
    localStorage.setItem("cartItems", JSON.stringify(newCart));
  };

  return (
    <div>
      <h1>Produkty</h1>
      {loading ? (
        <p>Ładowanie danych...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.description} -{" "}
              {product.price.toFixed(2)} PLN
              <button onClick={() => handleAddToCart(product)}>
                Dodaj do koszyka
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={() => (window.location.href = "/cart")}>
          Przejdź do koszyka
        </button>
      )}
    </div>
  );
};

export default Products;
