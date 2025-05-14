<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const navigate = useNavigate();

=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddProduct.module.css"; // ✅ Correct import

const AddProduct = () => {
  const navigate = useNavigate();
>>>>>>> origin/main
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
<<<<<<< HEAD
    category_id: "",
    subcategory_id: ""
  });

=======
    category: ""
  });
>>>>>>> origin/main
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch all categories on load
  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to load categories", err));
  }, []);

  // Fetch subcategories when category changes
  useEffect(() => {
    const selectedCat = categories.find(cat => cat.id === parseInt(product.category_id));
    if (!selectedCat) {
      setSubcategories([]);
      return;
    }

    axios.get(`http://localhost:5000/api/categories/${selectedCat.slug}`)
      .then(res => setSubcategories(res.data))
      .catch(err => {
        console.error("Failed to load subcategories", err);
        setSubcategories([]);
      });
  }, [product.category_id, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
=======
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
>>>>>>> origin/main
    setError("");
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
<<<<<<< HEAD
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Please login to add products");
=======
      // Get auth token
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to add products');
      }
>>>>>>> origin/main

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
<<<<<<< HEAD
      formData.append("category_id", product.category_id);
      formData.append("subcategory_id", product.subcategory_id);
      if (image) formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/products/add",
=======
      formData.append("category", product.category);
      if (image) formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/products/add", 
>>>>>>> origin/main
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
<<<<<<< HEAD
            Authorization: `Bearer ${token}`,
=======
            "Authorization": `Bearer ${token}`
>>>>>>> origin/main
          },
        }
      );

<<<<<<< HEAD
      if (response.data.message === "Product added successfully") {
        navigate("/products");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.response?.data?.message || err.message || "Error adding product");
=======
      if (response.data && response.data.message === "Product added successfully") {
        navigate("/products"); // Redirect to products page
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setError(error.response?.data?.message || error.message || "Error adding product");
>>>>>>> origin/main
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Product</h2>
<<<<<<< HEAD

=======
      
>>>>>>> origin/main
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={styles.input}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className={styles.formGroup}>
<<<<<<< HEAD
          <label htmlFor="category_id">Category:</label>
          <select
            id="category_id"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="subcategory_id">Subcategory:</label>
          <select
            id="subcategory_id"
            name="subcategory_id"
            value={product.subcategory_id}
            onChange={handleChange}
            className={styles.input}
            required
            disabled={!subcategories.length}
          >
            <option value="">-- Select Subcategory --</option>
            {subcategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
=======
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            className={styles.input}
          />
>>>>>>> origin/main
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image">Product Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            className={styles.fileInput}
            accept="image/*"
          />
        </div>

<<<<<<< HEAD
        <button
          type="submit"
=======
        <button 
          type="submit" 
>>>>>>> origin/main
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
