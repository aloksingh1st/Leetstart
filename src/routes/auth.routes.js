import express from "express";
import { checkMe, login, logout, register, resendVerificationMail, verifyUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validateLogin } from "../middleware/validators/loginValidator.js";
import { registerValidator } from "../middleware/validators/registerValidator.js";



const authRoutes = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: mySecurePassword123
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *                 example: USER
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or validation error
 *       500:
 *         description: Server error
 */

console.log(process.cwd())
authRoutes.post("/register", registerValidator, register);
authRoutes.get("/verify_token/:token", verifyUser);
authRoutes.post("/login", validateLogin, login);
authRoutes.get('/checkme', authMiddleware, checkMe);
authRoutes.post('/resendVerificationMail', resendVerificationMail);
authRoutes.post('/logout', logout);



export default authRoutes;