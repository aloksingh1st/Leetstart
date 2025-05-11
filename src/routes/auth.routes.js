import express from "express";
import { checkMe, dummyMail, login, logout, register, resendVerificationMail, verifyUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateLogin } from "../middleware/validators/loginValidator.js";
import { registerValidator } from "../middleware/validators/registerValidator.js";



const authRoutes = express.Router();

authRoutes.post("/register", registerValidator, register);

authRoutes.get("/verify_token/:token", verifyUser);
authRoutes.post("/login", validateLogin, login);
authRoutes.get('/checkme', authMiddleware, checkMe);
authRoutes.post('/resendVerificationMail', resendVerificationMail);
authRoutes.post('/logout', logout);
authRoutes.get('/dummyMail', dummyMail);



export default authRoutes;