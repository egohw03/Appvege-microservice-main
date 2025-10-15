import express from "express";
import { getProducts, getProductById, createProduct } from "../services/product.service.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
// Bạn có thể thêm các route cho update, delete ở đây

export default router;