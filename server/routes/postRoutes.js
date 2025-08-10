import express from 'express';
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from '../controllers/postController.js';
import protectRoute from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';




const postRouter = express.Router();

postRouter.route("/").get(getAllPosts).post(protectRoute, upload.single("image"), createPost);
postRouter.route("/:id").get(getPostById).put(protectRoute,upload.single("image"), updatePost).delete(protectRoute, deletePost);
postRouter.get("/user/:userId", protectRoute, getUserPosts);

export default postRouter;