import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 },
  image_url: { type: String }
});

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [cartItemSchema]
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;