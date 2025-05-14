import express from "express";
import {
  getAllCategories,
  getSubcategoriesByCategorySlug
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", getAllCategories);
router.get("/:slug", getSubcategoriesByCategorySlug);

export default router;
