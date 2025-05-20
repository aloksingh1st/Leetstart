import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";


export const useAuthStore = create((get, set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,


    checkAuth: async () => {
        set({ isCheckingAuth: true }); // ✅ FIXED

        try {
            const res = await axiosInstance.get("/auth/checkme");
            console.log("✅ checkAuth response:", res.data);
            set({ authUser: res.data.user });
        } catch (error) {
            
            console.log("❌ Error checking auth:", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    }



}));