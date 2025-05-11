import express from 'express';
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem, getAllProblems, getProblemById } from '../controllers/problems.controller.js';


const problemRoutes = express.Router();


problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createProblem);
problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);
problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById);



export default problemRoutes;