import React, { useState } from "react";
import styles from "./Products.module.css";
import Header from "./Header";
import Footer from "./Footer";

const Products = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: "Product 1",
      productDescription: "Description for Product 1",
      productPrice: 20,
      productCategory: "Category A",
      sold: false,
    },
    {
      id: 2,
      productName: "Product 2",
      productDescription: "Description for Product 2",
      productPrice: 30,
      productCategory: "Category B",
      sold: true,
    },
    // Add more products as needed
  ]);

  const handleToggleSold = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, sold: !product.sold } : product
      )
    );
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2>Products</h2>
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <div>
                <h3>{product.productName}</h3>
                <p>{product.productDescription}</p>
                <p>Price: ${product.productPrice}</p>
                <p>Category: {product.productCategory}</p>
              </div>
              <button
                className={`${styles.soldButton} ${
                  product.sold ? styles.sold : ""
                }`}
                onClick={() => handleToggleSold(product.id)}
              >
                {product.sold ? "Sold" : "Mark as Sold"}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
