import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        const soldProducts = res.data.filter((p) => p.is_sold);
        setTotalSales(soldProducts.length);
        const earnings = soldProducts.reduce(
          (acc, p) => acc + Number(p.price),
          0
        );
        setTotalEarnings(earnings);
      })
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Menu</div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link to="/dashboard" className={styles.navLink}>
                  Dashboard
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/products" className={styles.navLink}>
                  Products
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/analytics" className={styles.navLink}>
                  Analytics
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/settings" className={styles.navLink}>
                  Settings
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/profile" className={styles.navLink}>
                  Profile
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link to="/add-product" className={styles.navLink}>
                  Add Product
                </Link>
              </li>
              <li className={styles.navItem}>
                <button onClick={handleLogout} className={styles.logoutLink}>
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </aside>
        <main className={styles.mainContent}>
          <h1 className={styles.mainHeader}>Dashboard Overview</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Total Products</h3>
              <p className={styles.statValue}>{products.length}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Total Sales</h3>
              <p className={styles.statValue}>{totalSales}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Active Listings</h3>
              <p className={styles.statValue}>{products.length - totalSales}</p>
            </div>
            <div className={styles.statCard}>
              <h3 className={styles.statTitle}>Total Earnings</h3>
              <p className={styles.statValue}>₹{totalEarnings}</p>
            </div>
          </div>
          <div className={styles.gettingStarted}>
            <h2 className={styles.gettingStartedTitle}>Getting Started</h2>
            <p className={styles.gettingStartedText}>
              Welcome to your seller dashboard! Here's what you can do:
            </p>
            <ul>
              <li>Add new products to your inventory</li>
              <li>Manage your existing products</li>
              <li>Track your sales and analytics</li>
              <li>Update your profile and settings</li>
            </ul>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
