import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products...");
        const response = await axios.get("http://localhost:5000/api/products");
        console.log("API Response:", response.data);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log("Current products state:", products);
  console.log("Loading state:", loading);
  console.log("Error state:", error);

  const handleToggleSold = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to update product status');
      }

      await axios.patch(
        `http://localhost:5000/api/products/${productId}/sold`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product.id === productId ? { ...product, is_sold: !product.is_sold } : product
        )
      );
    } catch (err) {
      console.error("Error updating product status:", err);
      setError("Failed to update product status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <h2>Loading products...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div>
        <Header />
        <div className={styles.container}>
          <h2>No products found</h2>
          <p>There are currently no products available.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2>Products ({products.length})</h2>
        {error && <p className={styles.error}>{error}</p>}
        <ul className={styles.productList}>
          {products.map((product) => {
            console.log("Rendering product:", product);
            return (
              <li key={product.id} className={styles.productItem}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ₹{product.price}</p>
                  <p>Category: {product.category || 'Uncategorized'}</p>
                  {product.image_url && (
                    <img 
                      src={`http://localhost:5000/uploads/${product.image_url}`} 
                      alt={product.name}
                      className={styles.productImage}
                    />
                  )}
                </div>
                <button
                  className={`${styles.soldButton} ${
                    product.is_sold ? styles.sold : ""
                  }`}
                  onClick={() => handleToggleSold(product.id)}
                >
                  {product.is_sold ? "Sold" : "Mark as Sold"}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
