import express from "express";
import mysql from "mysql2";
import multer from "multer";
import dotenv from "dotenv";
import { auth } from "../middleware/auth.js";

dotenv.config();

const router = express.Router();

// Set up multer storage
const upload = multer({ dest: "uploads/" });

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "your_database",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
  } else {
    console.log("Connected to the MySQL database");
  }
});

// Test database connection and table
router.get("/test", (req, res) => {
  // First check if products table exists
  db.query("SHOW TABLES LIKE 'products'", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database connection error", details: err.message });
    }
    
    if (results.length === 0) {
      // Create products table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          user_id INT NOT NULL,
          image VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error("Table creation error:", err);
          return res.status(500).json({ error: "Failed to create products table", details: err.message });
        }
        res.json({ message: "Products table created successfully" });
      });
    } else {
      // Check if user_id column exists
      db.query("DESCRIBE products", (err, structure) => {
        if (err) {
          console.error("Error describing table:", err);
          return res.status(500).json({ error: "Error checking table structure" });
        }

        // Check if user_id column exists
        const hasUserId = structure.some(col => col.Field === 'user_id');
        
        if (!hasUserId) {
          // Add user_id column if it doesn't exist
          const alterTableQuery = `
            ALTER TABLE products 
            ADD COLUMN user_id INT NOT NULL AFTER price
          `;
          
          db.query(alterTableQuery, (err) => {
            if (err) {
              console.error("Error adding user_id column:", err);
              return res.status(500).json({ error: "Failed to add user_id column" });
            }
            res.json({ 
              message: "Products table updated - added user_id column",
              structure: [...structure, { Field: 'user_id', Type: 'int', Null: 'NO' }]
            });
          });
        } else {
          res.json({ 
            message: "Products table exists and has correct structure",
            structure: structure
          });
        }
      });
    }
  });
});

// Route to get all products
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Error fetching products." });
    }
    res.status(200).json(results);
  });
});

// Route to add product (requires authentication)
router.post("/add", auth, upload.single("image"), (req, res) => {
  try {
    // Log full request details for debugging
    console.log("=== DEBUG INFO ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    console.log("Auth header:", req.headers.authorization);
    console.log("User from auth:", req.user);
    console.log("=================");

    const { name, description, price, category } = req.body;

    // Detailed validation checks
    const validationErrors = [];
    if (!name) validationErrors.push("Name is required");
    if (!description) validationErrors.push("Description is required");
    if (!price) validationErrors.push("Price is required");
    if (!req.user || !req.user.id) validationErrors.push("User authentication failed");

    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: "Validation failed",
        errors: validationErrors,
        received: {
          name,
          description,
          price,
          category,
          hasFile: !!req.file,
          hasUser: !!req.user,
          userId: req.user?.id
        }
      });
    }

    const user_id = req.user.id;
    const image_url = req.file ? req.file.filename : null;
    const is_sold = 0;

    // Convert and validate price
    const priceDecimal = parseFloat(price);
    if (isNaN(priceDecimal)) {
      return res.status(400).json({ 
        message: "Invalid price format",
        receivedPrice: price
      });
    }

    // Log the query parameters before execution
    const queryParams = [
      name, 
      description, 
      priceDecimal, 
      category || null, 
      image_url, 
      is_sold,
      user_id
    ];
    console.log("Query parameters:", queryParams);

    const query = `
      INSERT INTO products (name, description, price, category, image_url, is_sold, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(query, queryParams, (err, result) => {
      if (err) {
        console.error("Database error details:", {
          message: err.message,
          code: err.code,
          errno: err.errno,
          sql: err.sql,
          sqlState: err.sqlState,
          sqlMessage: err.sqlMessage
        });
        
        return res.status(500).json({ 
          message: "Error adding product",
          error: err.message,
          sqlMessage: err.sqlMessage,
          code: err.code,
          details: {
            sql: err.sql,
            sqlState: err.sqlState
          }
        });
      }

      // Success response
      res.status(201).json({
        message: "Product added successfully",
        product: {
          id: result.insertId,
          name,
          description,
          price: priceDecimal,
          category,
          image_url,
          is_sold,
          user_id
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({
      message: "Unexpected error occurred",
      error: error.message
    });
  }
});

export default router;
