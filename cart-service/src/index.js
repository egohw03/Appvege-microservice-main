import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7070; // Chọn một port khác, ví dụ 7070

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// Tất cả các route liên quan đến giỏ hàng sẽ bắt đầu bằng /
app.use("/", cartRoutes);

app.listen(PORT, () => {
  console.log(`Cart Service is running on PORT: ${PORT}`);
  connectDB();
});