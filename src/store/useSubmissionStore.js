import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { toast } from "react-hot-toast";

export const useSubmissionStore = create((set, get) => ({
    isLoading: false,
    submissions: [],
    submission: null,
    submissionCount: null,

    getAllSubmissions: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/submissions/get-all-submissions");
            set({ submissions: res.data.submissions || [] });
            toast.success(res.data.message || "Fetched all submissions");
        } catch (error) {
            console.error("Error getting all submissions", error);
            toast.error("Failed to fetch all submissions");
        } finally {
            set({ isLoading: false });
        }
    },

    getSubmissionForProblem: async (problemId) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(
                `/submissions/get-submissions/${problemId}`
            );
            set({ submission: res.data.submissions || [] });
        } catch (error) {
            console.error("Error getting submissions for problem", error);
            toast.error("Failed to fetch submissions for this problem");
        } finally {
            set({ isLoading: false });
        }
    },

    getSubmissionCountForProblem: async (problemId) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(
                `/submissions/get-submissions-count/${problemId}`
            );
            set({ submissionCount: res.data.count || 0 });
        } catch (error) {
            console.error("Error getting submission count for problem", error);
            toast.error("Failed to fetch submission count");
        } finally {
            set({ isLoading: false });
        }
    },
}));
