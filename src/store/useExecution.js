import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import toast from "react-hot-toast";




export const useExecutionStore = create((set, get) => ({
    isExecuting: false,
    submission: null,



    executeCode: async (source_code, language_id, stdin, expected_outputs, problemId, isSubmission = 0) => {
        try {
            set({ isExecuting: true });

            const res = await axiosInstance.post("/execute-code", { source_code, language_id, stdin, expected_outputs, problemId, isSubmission });



            if (isSubmission == 1) {
                set({ submission: res.data.submission.testCases });
            }
            else {
                set({ submission: res.data.submission });
            }

            console.log(res.data);

            toast.success(res.data.message);
        } catch (error) {
            console.log("Error executing code", error);
            toast.error("Error executing code");
        }

        finally {
            set({ isExecuting: false });
        }
    }
}));