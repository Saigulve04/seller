import db from "../db.js";

export const getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

export const getSubcategoriesByCategorySlug = (req, res) => {
  const { slug } = req.params;

  const query = `
    SELECT s.* FROM subcategories s
    JOIN categories c ON s.category_id = c.id
    WHERE c.slug = ?
  `;

  db.query(query, [slug], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
