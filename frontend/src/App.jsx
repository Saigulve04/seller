import React from "react";
import { Routes, Route } from "react-router-dom";
import Landingpage from "./LandingPage";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import AddProduct from "./AddProduct";
import Products from "./Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/products" element={<Products />} />
    </Routes>
  );
}

export default App;
