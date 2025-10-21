import express from "express";
import { checkMe, dummyMail, getUserProfile, login, logout, register, resendVerificationMail, updateUserProfile, verifyUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateLogin } from "../middleware/validators/loginValidator.js";
import { registerValidator } from "../middleware/validators/registerValidator.js";

import { upload } from '../utils/multer.js';



const authRoutes = express.Router();

authRoutes.post("/register", registerValidator, register);

authRoutes.get("/verify_token/:token", verifyUser);
authRoutes.post("/login", validateLogin, login);
authRoutes.get('/checkme', authMiddleware, checkMe);
authRoutes.post('/resendVerificationMail', resendVerificationMail);
authRoutes.patch(
    '/profile',
    authMiddleware,
    upload.single('image'), // `image` is the field name
    updateUserProfile
  );
authRoutes.post('/logout', logout);
authRoutes.get('/getUserProfile', authMiddleware, getUserProfile);
authRoutes.get('/dummyMail', dummyMail);



export default authRoutes;