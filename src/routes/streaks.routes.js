import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { get5Submissions, getCurrentMonthSubmissionDates, getLast30DaysSubmissionDates, getUserStreaks } from "../controllers/streaks.controller.js";


const streakRoutes = express.Router();

streakRoutes.get('/', authMiddleware, getUserStreaks);
streakRoutes.get('/getLast30DaysSubmissionDates', authMiddleware, getLast30DaysSubmissionDates);
streakRoutes.get('/get5Submissions', authMiddleware, get5Submissions);
streakRoutes.get('/getCurrentMonthSubmissionDates', authMiddleware, getCurrentMonthSubmissionDates);

export default streakRoutes;