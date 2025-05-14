import React from "react";
import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======
import Landingpage from "./LandingPage";
>>>>>>> origin/main
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import AddProduct from "./AddProduct";
import Products from "./Products";
<<<<<<< HEAD
import Categories from "./Categories";         // ✅ Added
import Subcategories from "./Subcategories";   // ✅ Added
=======
>>>>>>> origin/main

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Signup />} />
=======
      <Route path="/" element={<Landingpage />} />
      <Route path="/signup" element={<Signup />} />
>>>>>>> origin/main
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/products" element={<Products />} />
<<<<<<< HEAD

      {/* Optional: Keep these if you want category pages to still work independently */}
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<Subcategories />} />
=======
>>>>>>> origin/main
    </Routes>
  );
}

export default App;
