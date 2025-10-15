import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

const useCartStore = create((set, get) => ({
    cart: null,
    isLoading: false,

    fetchCart: async () => {
        set({ isLoading: true });
        try {
            const res = await apiClient.get('/cart');
            set({ cart: res.data });
        } catch (error) {
            console.error("Failed to fetch cart:", error);
            set({ cart: { items: [] } });
        } finally {
            set({ isLoading: false });
        }
    },

    addToCart: async (productId, quantity = 1) => {
        try {
            const res = await apiClient.post('/cart/add', { productId, quantity });
            set({ cart: res.data });
            toast.success("Product added to cart!");
        } catch (error) {
            console.error("Failed to add to cart:", error);
            toast.error(error.response?.data?.message || "Failed to add product.");
        }
    },
    
    removeFromCart: async (productId) => {
        try {
            const res = await apiClient.delete(`/cart/remove/${productId}`);
            set({ cart: res.data });
            toast.success("Product removed from cart.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove product.");
        }
    },

    updateQuantity: async (productId, quantity) => {
        try {
            const res = await apiClient.put(`/cart/update/${productId}`, { quantity });
            set({ cart: res.data });
            toast.success("Cart updated.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update cart.");
        }
    },
}));

export default useCartStore;