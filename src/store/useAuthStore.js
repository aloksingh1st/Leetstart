import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null, // ❗use null instead of false for clarity
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,

    checkAuth: async () => {
        set({ isCheckingAuth: true });

        try {


            // const res = await axiosInstance.post("/auth/logout");
            const res = await axiosInstance.get("/auth/checkme");
            console.log("✅ checkAuth response:", res.data);

            if (res.data?.user) {
                set({ authUser: res.data.user });
            } else {
                set({ authUser: null });
            }
        } catch (error) {
            console.error("❌ Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    // ✅ Signup
    signup: async (data) => {
        set({ isSigninUp: true });

        try {
            const res = await axiosInstance.post("/auth/register", data);

            if (res.data?.user) {
                set({ authUser: res.data.user });
                toast.success(res.data.message || "Signup successful");
            } else {
                toast.error("Unexpected signup response");
            }
        } catch (error) {
            console.error("❌ Error signing up:", error);
            toast.error(error?.response?.data?.message || "Error signing up");
        } finally {
            set({ isSigninUp: false });
        }
    },

    // ✅ Login
    login: async (data) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post("/auth/login", data);

            if (res.data?.user) {
                set({ authUser: res.data.user });
                toast.success(res.data.message || "Login successful");
            } else {
                toast.error("Unexpected login response");
            }
        } catch (error) {
            console.error("❌ Error logging in:", error);
            toast.error(error?.response?.data?.message || "Error logging in");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    // ✅ Logout
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful");
        } catch (error) {
            console.error("❌ Error logging out:", error);
            toast.error("Error logging out");
        }
    }
}));
