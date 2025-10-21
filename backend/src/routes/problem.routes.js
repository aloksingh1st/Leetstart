import express from 'express';
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById } from '../controllers/problems.controller.js';


const problemRoutes = express.Router();


problemRoutes.post("/create-problem", authMiddleware, checkAdmin, createProblem);
problemRoutes.get("/get-all-problems", authMiddleware, getAllProblems);
problemRoutes.get("/get-problem/:id", authMiddleware, getProblemById);
problemRoutes.get("/delete-problem/:id", authMiddleware, deleteProblem);
problemRoutes.get('/get-problemsSolvedByUser', authMiddleware, getAllProblemsSolvedByUser);



export default problemRoutes;