import express from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { getAllSubmissions, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controller.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authenticate, getAllSubmissions)

submissionRoutes.get("/get-submissions/:problemId", authenticate, getSubmissionsForProblem)

submissionRoutes.get("/get-submissions-count/:problemId", authenticate, getAllTheSubmissionsForProblem)


export default submissionRoutes;