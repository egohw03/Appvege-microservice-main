import express from "express";
import { createOrder, getOrders } from "../services/order.service.js";
import isAuthenticated from "../../../isAuthenticated.mjs";

const router = express.Router();

// Lấy tất cả đơn hàng của người dùng
router.get("/", isAuthenticated, getOrders);

// Tạo một đơn hàng mới (checkout)
router.post("/checkout", isAuthenticated, createOrder);

export default router;