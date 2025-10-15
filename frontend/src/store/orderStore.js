import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

const useOrderStore = create((set) => ({
    orders: [],
    isLoading: false,

    // Lấy lịch sử đơn hàng
    fetchOrders: async () => {
        set({ isLoading: true });
        try {
            const res = await apiClient.get('/orders');
            set({ orders: res.data });
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    // Tạo đơn hàng mới (checkout)
    checkout: async (shippingAddress) => {
        set({ isLoading: true });
        try {
            const res = await apiClient.post('/orders/checkout', { shippingAddress });
            toast.success("Order placed successfully!");
            return res.data; // Trả về đơn hàng đã tạo
        } catch (error) {
            toast.error(error.response?.data?.message || "Checkout failed.");
            return null;
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useOrderStore;