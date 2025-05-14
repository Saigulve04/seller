import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import AddProduct from "./AddProduct";
import Products from "./Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/products" element={<Products />} />

      {/* Optional: Keep these if you want category pages to still work independently */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<Subcategories />} />
    </Routes>
  );
}

export default App;
