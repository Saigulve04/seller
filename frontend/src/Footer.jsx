import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Everything India</h3>
          <p>Your one-stop marketplace for buying and selling products.</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <p>Email: support@everythingindia.com</p>
          <p>Phone: +91 1234567890</p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Everything India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
