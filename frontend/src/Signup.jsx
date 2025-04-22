import React, { useState } from "react";
import styles from "./Signup.module.css"; 
import { Link, useNavigate } from "react-router-dom";
 // Create Signup.module.css

const API_URL = 'http://localhost:5000';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Client-side validation
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        throw new Error("First name and last name are required");
      }

      if (!formData.contact.trim()) {
        throw new Error("Contact number is required");
      }

      const contactRegex = /^\d{10}$/;
      if (!contactRegex.test(formData.contact)) {
        throw new Error("Please enter a valid 10-digit contact number");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      // Prepare registration data
      const registrationData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email.trim(),
        password: formData.password,
        contact: formData.contact.trim(),
        company: formData.company.trim()
      };

      console.log('Attempting to register with:', {
        ...registrationData,
        password: '[HIDDEN]'
      });

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
        console.log('Response data:', data);
      } else {
        const text = await response.text();
        console.log('Response text:', text);
        throw new Error('Server returned non-JSON response');
      }

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Registration successful
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Something went wrong during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Image Container */}
      <div className={styles.imageContainer}>
        {/* Replace with your actual image */}
        <img src="/login.png" alt="Login" className={styles.image} />
      </div>

      <div className={styles.formContainer}>
        <h2 className={styles.title}>Sign Up</h2>
        <p className={styles.subtitle}>
          Register to sell your products quickly and easily.
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                className={styles.input}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                className={styles.input}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="tel"
              name="contact"
              placeholder="Contact No *"
              className={styles.input}
              value={formData.contact}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Please enter a valid 10-digit contact number"
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="text"
              name="company"
              placeholder="Company Name (Optional)"
              className={styles.input}
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputWrapper}>
            <input
              type="email"
              name="email"
              placeholder="E-mail ID *"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                name="password"
                placeholder="Password *"
                className={styles.input}
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                title="Password must be at least 6 characters long"
              />
            </div>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password *"
                className={styles.input}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </div>

          <p className={styles.requiredNote}>* Required fields</p>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className={styles.loginLink}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
