import express from "express";
import { executeCode } from "../controllers/executeCode.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const executeCodeRoutes = express.Router();


executeCodeRoutes.post("/", authMiddleware, executeCode)


export default executeCodeRoutes;