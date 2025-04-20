import { json } from "express";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";



import authRoutes from "./routes/auth.routes.js";

const app  = express();

dotenv.config();
app.use(json());
app.use(cookieParser());



app.use("/api/v1/auth" , authRoutes);


app.listen(process.env.PORT, ()=>{
    console.log("Server Started Successfully on port " + process.env.PORT + " 🤠")
})