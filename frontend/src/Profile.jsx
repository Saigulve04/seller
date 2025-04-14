import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const API_URL = 'http://localhost:5000';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branchLocation: ""
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      // Fetch bank details
      fetchBankDetails(user.id);
    }
  }, []);

  const fetchBankDetails = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/bank-details/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (response.ok && data.bank_name) {
        setBankDetails({
          bankName: data.bank_name,
          accountNumber: data.account_number,
          ifscCode: data.ifsc_code,
          branchLocation: data.branch_location
        });
      }
    } catch (err) {
      console.error('Error fetching bank details:', err);
    }
  };

  const handleBankDetailsSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/users/bank-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bankDetails)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update bank details');
      }

      setSuccessMessage('Bank details updated successfully');
    } catch (err) {
      console.error('Error updating bank details:', err);
      setError(err.message || 'Failed to update bank details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBankDetailsChange = (e) => {
    setBankDetails({
      ...bankDetails,
      [e.target.id]: e.target.value
    });
    setError("");
    setSuccessMessage("");
  };

  if (!userData) {
    return <div className={styles.container}>Loading...</div>;
  }

  // Split the full name into first and last name
  const [firstName, ...lastNameParts] = userData.name.split(' ');
  const lastName = lastNameParts.join(' ');

  return (
    <div className={styles.container}>
      <h2>My Profile</h2>

      {/* Display User Data */}
      <div className={styles.profileData}>
        <div>
          <p>
            <strong>First Name:</strong> {firstName}
          </p>
          <p>
            <strong>Last Name:</strong> {lastName}
          </p>
          <p>
            <strong>Contact No:</strong> {userData.contact}
          </p>
          <p>
            <strong>Company Name:</strong> {userData.company || 'Not specified'}
          </p>
          <p>
            <strong>Email ID:</strong> {userData.email}
          </p>
        </div>
      </div>

      {/* Bank Details Section */}
      <h3>Bank Details</h3>
      {error && <div className={styles.error}>{error}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}
      
      <form className={styles.bankDetailsForm} onSubmit={handleBankDetailsSubmit}>
        <div>
          <label htmlFor="bankName">Bank Name:</label>
          <input 
            type="text" 
            id="bankName" 
            className={styles.input}
            value={bankDetails.bankName}
            onChange={handleBankDetailsChange}
            required
          />
        </div>
        <div>
          <label htmlFor="accountNumber">Account Number:</label>
          <input 
            type="text" 
            id="accountNumber" 
            className={styles.input}
            value={bankDetails.accountNumber}
            onChange={handleBankDetailsChange}
            required
          />
        </div>
        <div>
          <label htmlFor="ifscCode">IFSC Code:</label>
          <input 
            type="text" 
            id="ifscCode" 
            className={styles.input}
            value={bankDetails.ifscCode}
            onChange={handleBankDetailsChange}
            required
            pattern="^[A-Z]{4}0[A-Z0-9]{6}$"
            title="Please enter a valid IFSC code (e.g., SBIN0123456)"
          />
        </div>
        <div>
          <label htmlFor="branchLocation">Branch Location:</label>
          <input 
            type="text" 
            id="branchLocation" 
            className={styles.input}
            value={bankDetails.branchLocation}
            onChange={handleBankDetailsChange}
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.saveButton}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Bank Details'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
