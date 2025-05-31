import { json } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { swaggerUi, swaggerSpec } from './libs/swaggerConfig.js';
import  statusMonitor from "express-status-monitor";
import morgan from "morgan";
import path, {dirname} from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executeCodeRoutes from "./routes/executeCode.route.js";
import submissionRoutes from "./routes/submissions.route.js";
import playlistRoutes from "./routes/playlists.route.js";
import healthCheckRouter from "./routes/healthCheck.routes.js";


const app = express();

dotenv.config();
app.use(json());
app.use(cookieParser());
app.use(statusMonitor());
app.use(morgan('combined'));

const allowedOrigins = [
    'http://localhost:5173',
    'https://leetstart.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, postman)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        } else {
            return callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));



app.get('/logs', (req, res) => {
    const logFilePath = path.join(__dirname, 'access.log');
    
    fs.readFile(logFilePath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading log file.' +err);
      } else {
        res.type('text/plain').send(data);
      }
    });
  });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code", executeCodeRoutes)
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/healthCheck", healthCheckRouter);



app.listen(process.env.PORT, () => {
    console.log("Server Started Successfully on port " + process.env.PORT + " 🤠")
})