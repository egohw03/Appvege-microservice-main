import express from "express";
import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from "../services/cart.service.js";
import isAuthenticated from "../../../isAuthenticated.mjs"; 

const router = express.Router();

// Lấy giỏ hàng của người dùng
router.get("/", isAuthenticated, getCart);
router.post("/add", isAuthenticated, addToCart);
router.delete("/remove/:productId", isAuthenticated, removeFromCart);
router.put("/update/:productId", isAuthenticated, updateCartItem);
router.delete("/clear", isAuthenticated, clearCart);

export default router;