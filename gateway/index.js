import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import proxy from "express-http-proxy";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

// Hàm này sẽ lấy cookie từ request gốc và gắn vào request chuyển tiếp
const proxyReqHandler = (proxyReqOpts, srcReq) => {
  if (srcReq.headers.cookie) {
    proxyReqOpts.headers['Cookie'] = srcReq.headers.cookie;
  }
  return proxyReqOpts;
};

// Áp dụng hàm xử lý cookie cho tất cả các proxy
app.use("/api/products", proxy("http://localhost:9090", { proxyReqOptDecorator: proxyReqHandler }));
app.use("/api/auth", proxy("http://localhost:6060", { proxyReqOptDecorator: proxyReqHandler }));
app.use("/api/cart", proxy("http://localhost:7070", { proxyReqOptDecorator: proxyReqHandler }));
app.use("/api/orders", proxy("http://localhost:8080", { proxyReqOptDecorator: proxyReqHandler }));

app.listen(PORT, () => {
  console.log(`Gateway is running on PORT: ${PORT}`);
});