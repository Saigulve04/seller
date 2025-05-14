import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Main Categories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <Link to={`/category/${cat.slug}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
