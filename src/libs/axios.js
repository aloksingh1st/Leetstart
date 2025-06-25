import axios from "axios";

console.log(import.meta.env.VITE_API_URL);
export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://api.aloksingh.tech/api/v1" : import.meta.env.VITE_API_URL,
    withCredentials: true,
});