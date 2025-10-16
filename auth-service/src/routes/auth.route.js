import express from "express";
import { signup, login, logout, getProfile, getAllUsers } from "../services/auth.service.js";

import isAuthenticated from "../../../isAuthenticated.mjs";

const router = express.Router();

router.post("/register", signup);
router.post("/login", login);
router.post("/logout", logout);

// Các route này cần được bảo vệ
router.get("/check", isAuthenticated, getProfile);
router.get("/profile", isAuthenticated, getProfile);
router.get("/users", isAuthenticated, getAllUsers);

export default router;