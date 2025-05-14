// db.js
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
<<<<<<< HEAD
  password: process.env.DB_PASSWORD,
=======
  password: process.env.DB_PASS,
>>>>>>> origin/main
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL database ✅");
});

export default db;
