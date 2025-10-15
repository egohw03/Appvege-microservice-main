import Order from "../models/order.model.js";
import axios from "axios";

// Hàm tạo đơn hàng từ giỏ hàng
export const createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { shippingAddress } = req.body;

        if (!shippingAddress) {
            return res.status(400).json({ message: "Shipping address is required" });
        }

        // 1. Gọi đến Cart Service để lấy giỏ hàng hiện tại
        // Lưu ý: Cần truyền cookie/token xác thực trong header
         const cartResponse = await axios.get(`http://localhost:7070/`, {
             headers: { 'Cookie': req.headers.cookie } 
        });
        
        const cart = cartResponse.data;

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 2. Tính tổng tiền
        const totalAmount = cart.items.reduce((total, item) => total + item.quantity * item.price, 0);

        // 3. Tạo đơn hàng mới
        const newOrder = new Order({
            userId,
            items: cart.items,
            totalAmount,
            shippingAddress,
            status: 'pending'
        });

        await newOrder.save();

        // 4. (Quan trọng) Xóa giỏ hàng sau khi đã checkout thành công
        // Service này sẽ gọi một API khác của Cart Service để xóa giỏ hàng
        // await axios.delete(`http://localhost:7070/api/cart/clear`, {
        //     // headers: { 'Cookie': req.headers.cookie } 
        // });

        res.status(201).json(newOrder);

    } catch (error) {
        console.error("Error in createOrder:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Hàm lấy lịch sử đơn hàng
export const getOrders = async (req, res) => {
    try {
        const userId = "temp-user-id"; // Thay bằng req.user.userId;
        const orders = await Order.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};