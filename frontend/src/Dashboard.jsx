import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
<<<<<<< HEAD
import Header from "./Header";
import Footer from "./Footer";
=======
>>>>>>> origin/main

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

<<<<<<< HEAD
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
=======
  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/dashboard" className={styles.logoLink}>
            <img
              src="/Frame 1.svg"
              alt="Everything Logo"
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

      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>Seller Dashboard</div>
>>>>>>> origin/main
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
<<<<<<< HEAD
                <button onClick={handleLogout} className={styles.logoutLink}>
                  Logout
                </button>
=======
                <Link to="/logout" className={styles.logoutLink}>
                  Logout
                </Link>
>>>>>>> origin/main
              </li>
            </ul>
          </nav>
        </aside>
<<<<<<< HEAD
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
=======

        <main className={styles.mainContent}>
          <h1 className={styles.mainHeader}>Welcome to your Dashboard</h1>
          <div className={styles.stats}>
            <div className={styles.statCard}>
              <div className={styles.statTitle}>Total Products</div>
              <div className={styles.statValue}>{products.length}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statTitle}>Total Sales</div>
              <div className={styles.statValue}>{totalSales}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statTitle}>Total Earnings</div>
              <div className={styles.statValue}>₹{totalEarnings}</div>
            </div>
          </div>

          <div className={styles.gettingStarted}>
            <h2 className={styles.gettingStartedTitle}>My Products</h2>
            <ul className={styles.productList}>
              {products.map((prod) => (
                <li key={prod.id} className={styles.productItem}>
                  <strong>{prod.name}</strong> - ₹{prod.price} -{" "}
                  {prod.is_sold ? "Sold" : "Available"}
                </li>
              ))}
            </ul>

            <div className={styles.addProductSection}>
              <Link to="/add-product" className={styles.addProductButton}>
                Add Your Product
              </Link>
            </div>
          </div>
        </main>
      </div>
>>>>>>> origin/main
    </div>
  );
};

export default Dashboard;
