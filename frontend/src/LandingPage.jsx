import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./assets/istockphoto-1247569904-612x612.jpg"; // Import your background image

const LandingPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional overlay
        backgroundBlendMode: "multiply", // Optional blending
        color: "white",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        padding: "20px",
      }}
    >
      {/* Logo (Image) */}
      <img
        src="/Frame 1.svg"
        alt="Everything.india Logo"
        style={{ maxWidth: "150px", marginBottom: "20px" }}
      />

      {/* Tagline */}
      <div
        style={{
          fontSize: "1.2em",
          marginBottom: "30px",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        The perfect place to get the perfect price for your product.
      </div>

      {/* Sign Up Button (using Link) */}
      <Link
        to="/Signup"
        style={{
          backgroundColor: "white",
          color: "black",
          padding: "12px 25px",
          textDecoration: "none",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "1em",
        }}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default LandingPage;
