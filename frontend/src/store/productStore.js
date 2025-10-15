import { create } from 'zustand';
import axios from 'axios';

// Cấu hình axios để gọi đến API Gateway
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

const useProductStore = create((set) => ({
    products: [],
    isLoading: false,
    fetchProducts: async () => {
        set({ isLoading: true });
        try {
            // Gọi đến /api/products, gateway sẽ chuyển đến product-service
            const response = await apiClient.get('/products');
            set({ products: response.data });
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useProductStore;