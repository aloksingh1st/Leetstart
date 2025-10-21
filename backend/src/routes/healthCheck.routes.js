import express from "express";
import { healthCheck } from "../controllers/healthCheck.controller.js";


const healthCheckRouter = express.Router();


healthCheckRouter.get("/", healthCheck);


export default healthCheckRouter;