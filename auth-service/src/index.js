import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6060;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  // Thay đổi origin cho phù hợp với frontend của bạn
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use("/", authRoutes);

app.listen(PORT, () => {
  console.log(`Auth Service is running on PORT: ${PORT}`);
  connectDB();
});