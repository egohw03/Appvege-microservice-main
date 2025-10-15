import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], 
        default: 'pending' 
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;