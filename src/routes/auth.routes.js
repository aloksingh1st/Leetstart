import express from "express";
import { checkMe, login, logout, register, resendVerificationMail, verifyUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const authRoutes = express.Router();


authRoutes.post("/register", register);
authRoutes.get("/verify_token/:token", verifyUser);
authRoutes.post("/login", login);
authRoutes.get('/checkme', authMiddleware, checkMe);
authRoutes.post('/resendVerificationMail', resendVerificationMail);
authRoutes.post('/logout', logout);



export default authRoutes;