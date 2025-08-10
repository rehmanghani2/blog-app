import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import generateText from "../controllers/aiController.js";

const aiRouter = express.Router();

aiRouter.post("/generate", protectRoute, generateText);

export default aiRouter;