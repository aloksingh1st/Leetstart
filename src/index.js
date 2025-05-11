import { json } from "express";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { swaggerUi, swaggerSpec } from './libs/swaggerConfig.js';


import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";

const app  = express();

dotenv.config();
app.use(json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth" , authRoutes);
app.use("/api/v1/problems", problemRoutes);



app.listen(process.env.PORT, ()=>{
    console.log("Server Started Successfully on port " + process.env.PORT + " 🤠")
})