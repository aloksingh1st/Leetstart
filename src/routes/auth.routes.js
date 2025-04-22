import express from "express";
import { register, verifyUser } from "../controllers/auth.controller.js";


const authRoutes = express.Router();


authRoutes.post("/register", register);
authRoutes.get("/verify_token/:token", verifyUser);



export default authRoutes;