import Cart from "../models/cart.model.js";
import axios from "axios";

// Hàm để lấy giỏ hàng của người dùng
export const getCart = async (req, res) => {
    try {
        const userId = req.user.userId; 
        const cart = await Cart.findOne({ userId });
        
        if (!cart) {
            return res.status(200).json({ userId, items: [] });
        }
        
        res.status(200).json(cart);
    } catch (error) {
        console.error("Error in getCart:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Hàm thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    try {
        // 1. Gọi đến Product Service để lấy thông tin sản phẩm
        const productResponse = await axios.get(`http://localhost:9090/${productId}`);
        const product = productResponse.data;

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // 2. Tìm giỏ hàng của người dùng, nếu chưa có thì tạo mới
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        // 3. Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (itemIndex > -1) {
            // Nếu đã có, cập nhật số lượng
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Nếu chưa có, thêm mới
            cart.items.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image_url: product.image_url
            });
        }
        
        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        console.error("Error in addToCart:", error.message);
        res.status(500).json({ error: "Internal Server Error or Product not found" });
    }
};

// Hàm xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.userId;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(item => item.productId !== productId);
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Hàm cập nhật số lượng sản phẩm
export const updateCartItem = async (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.userId;

    try {
        if (quantity <= 0) {
            // Nếu số lượng <= 0, coi như là xóa sản phẩm
            return removeFromCart(req, res);
        }

        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity = quantity;
        } else {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        
        await cart.save();
        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};