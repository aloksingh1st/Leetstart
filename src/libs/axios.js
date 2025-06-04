import { meta } from "@eslint/js";
import axios from "axios";

console.log(import.meta.env.VITE_API_URL);
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:8000/api/v1" : import.meta.env.VITE_API_URL,
    withCredentials: true,
});