import express from 'express';
import { createComment, deleteComment, getCommentsByPost, updateComment } from '../controllers/commentController.js';
import protectRoute from '../middleware/authMiddleware.js';


const commentRouter = express.Router();

// public access: View all comments on a post
commentRouter.get("/post/:postId", getCommentsByPost);
// private access: Add comment to a post
commentRouter.post("/:postId", protectRoute, createComment);
commentRouter.put("/:commentId", protectRoute, updateComment);
commentRouter.delete("/:commentId", protectRoute,  deleteComment);

export default commentRouter;