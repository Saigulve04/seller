import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
                <Link to="/logout" className={styles.logoutLink}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

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
    </div>
  );
};

export default Dashboard;
