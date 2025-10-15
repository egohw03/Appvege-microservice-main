import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.model.js";

dotenv.config();

const sampleProducts = [
    { name: "Cải bẹ xanh", price: 1.5, category: "Rau", stock: 100, image_url: "/images/products/bapcai.png" },
    { name: "Táo Gala", price: 2.5, category: "Trái cây", stock: 50, image_url: "/images/products/apple.jpg" },
    { name: "Cà rốt Đà Lạt", price: 1.0, category: "Củ", stock: 200, image_url: "/images/products/carrot.jpg" },
    { name: "Chuối", price: 1.2, category: "Trái cây", stock: 150, image_url: "/images/products/banana.jpg" },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected for seeding.");

        await Product.deleteMany({}); // Xóa dữ liệu cũ
        await Product.insertMany(sampleProducts); // Thêm dữ liệu mới

        console.log("Database seeded successfully!");
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};

seedDB();