import React from "react";
import styles from "./header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Link to="/dashboard" className={styles.logoLink}>
          <img
            src="/SE logo.png"
            alt="Everything.india Logo"
            className={styles.logo}
          />
          <span className={styles.logoText}>Everything</span>
        </Link>
      </div>
      <div className={styles.headerRight}>
        <img
          src="/profile.png"
          alt="Profile"
          className={styles.profilePhoto}
          onClick={handleProfileClick}
          style={{ cursor: "pointer" }}
        />
      </div>
    </header>
  );
};

export default Header;
