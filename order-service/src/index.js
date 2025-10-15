import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import orderRoutes from "./routes/order.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Chọn port 8080

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/", orderRoutes);

app.listen(PORT, () => {
  console.log(`Order Service is running on PORT: ${PORT}`);
  connectDB();
});