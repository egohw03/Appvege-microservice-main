import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Hàm này sẽ tự động đọc biến MONGODB_URI từ file .env của service đang chạy nó
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // Thoát khỏi tiến trình nếu không thể kết nối DB
    process.exit(1);
  }
};