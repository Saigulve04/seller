import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Subcategories = () => {
  const { slug } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories/${slug}`)
      .then(res => setSubcategories(res.data))
      .catch(err => console.error(err));
  }, [slug]);

  return (
    <div>
      <h2>Subcategories under "{slug}"</h2>
      <ul>
        {subcategories.map(sub => (
          <li key={sub.id}>{sub.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Subcategories;
