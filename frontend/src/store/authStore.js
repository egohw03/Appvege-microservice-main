import { create } from 'zustand';
import axios from 'axios';
// Giả sử bạn đã cài đặt react-hot-toast
import { toast } from 'react-hot-toast'; 

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true,
});

const useAuthStore = create((set, get) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const res = await apiClient.get("/auth/check"); 
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await apiClient.post("/auth/register", data);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await apiClient.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await apiClient.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },
}));

export default useAuthStore;