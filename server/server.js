import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import http from 'http';
import { connectDB } from './config/db.js';
import authRouter from './routes/authRoutes.js';
import postRouter from './routes/postRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import aiRouter from './routes/aiRoutes.js';


dotenv.config();
// Create Express app and http server
const app = express();
const server = http.createServer(app);



// Middlewares
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));
app.use(express.json());
// Serve the 'uploads' folder as static
app.use('/uploads', express.static('uploads'));

// connect to DB
connectDB();

// Routes setup 
app.use("/api/status", (req,res) => res.send("server is live of blog-app"));
app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/ai', aiRouter);

if(process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, ()=> console.log("Server is running on PORT: " , PORT));
}

export default server;

