import db from "../db.js";

// Add Product
export const addProduct = (req, res) => {
  const { user_id, name, description, price } = req.body;

  const query = `
    INSERT INTO products (user_id, name, description, price, is_sold)
    VALUES (?, ?, ?, ?, false)
  `;

  db.query(query, [user_id, name, description, price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Product added successfully", result });
  });
};

// Get Products by User
export const getProductsByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT * FROM products WHERE user_id = ?
  `;

  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
};

// Mark Product as Sold
export const markProductSold = (req, res) => {
  const { productId } = req.params;

  const query = `
    UPDATE products SET is_sold = true WHERE id = ?
  `;

  db.query(query, [productId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Product marked as sold", result });
  });
};
