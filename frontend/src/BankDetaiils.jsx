import React from "react";
import styles from "./BankDetails.module.css";

const BankDetails = () => {
  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>EveryThing</div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <button className={styles.navButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.navButtonIcon} ${styles.active}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7a7 7 0 1110 10m-10 0L21 21"
                  />
                </svg>
                Dashboard
              </button>
            </li>
            <li className={styles.navItem}>
              <button className={styles.navButton}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.navButtonIcon}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a6.977 6.977 0 010-1.14C3 5.921 7.348 3 12 3c4.652 0 9 2.921 9 6.93a6.977 6.977 0 010 1.14V19"
                  />
                </svg>
                Bank Details
              </button>
            </li>
            {/* ... other nav items ... */}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.headerTitle}>Bank Details</h1>
          <div className={styles.profileIcon}>
            {/* Replace with actual profile icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={styles.profileIconSvg}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label htmlFor="bankName" className={styles.label}>
                Bank Name
              </label>
              <input
                type="text"
                id="bankName"
                className={styles.input}
                placeholder="Enter your bank name"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="accountNumber" className={styles.label}>
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                className={styles.input}
                placeholder="Enter your account number"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="ifscCode" className={styles.label}>
                IFSC Code
              </label>
              <input
                type="text"
                id="ifscCode"
                className={styles.input}
                placeholder="Enter IFSC code"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="branchName" className={styles.label}>
                Branch Name
              </label>
              <input
                type="text"
                id="branchName"
                className={styles.input}
                placeholder="Enter branch name"
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Save Details
          </button>
        </form>
      </main>
    </div>
  );
};

export default BankDetails;
