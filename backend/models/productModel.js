import mysql from "mysql2";

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost", // Database host
  user: "root", // Your MySQL username
  password: "password", // Your MySQL password
  database: "your_database", // Your MySQL database name
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Function to save product to the database
const addProduct = (name, description, price, user_id, imagePath, callback) => {
  const query = `
    INSERT INTO products (name, description, price, user_id, image)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, description, price, user_id, imagePath],
    (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    }
  );
};

export default addProduct;
