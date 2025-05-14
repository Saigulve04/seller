import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AddProduct.module.css";

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    subcategory_id: ""
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Please login to add products");

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("category_id", product.category_id);
      formData.append("subcategory_id", product.subcategory_id);
      if (image) formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Product added successfully") {
        navigate("/products");
      }
    } catch (err) {
      console.error("Error adding product:", err);
      setError(err.response?.data?.message || err.message || "Error adding product");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Add New Product</h2>

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

        <button
          type="submit"
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
