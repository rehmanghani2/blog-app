import Post from "../Models/Post.js";
import Comment from "../Models/Comment.js";

// POST /api/comments/:postId
// Add comment to a post
// Private access
export const createComment = async (req, res) => {
    const {text} = req.body;
    const {postId} = req.params;
    // console.log("Comment text: ", text);
    // console.log("PostID: ", postId);

    try {
        const post = await Post.findById(postId);
        console.log("Post: ", post);
        if(!post) return res.status(404).json({success: false, message: "Post not found"});

        const comment = await Comment.create({
            post: postId,
            user: req.user._id,
            text,
        });

        const populatedComment = await comment.populate("user", "username");
        res.status(201).json(populatedComment);
    } catch (error) {
          res.status(500).json({success: false, message: error.message});
    }
}
// GET /api/comments/:postId
// Get all comments for a post
// Public access
export const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;
    // const { id } = req.params;
    // console.log("getCommentsByPost(): ", postId);
    try {
        const comments = await Comment.find({ post: postId })
                        .populate("user", "username")
                        .sort({createdAt: -1});
       
        res.json(comments);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
// PUT /api/comment/:commentId
// Update the comment
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
        if(!comment) return res.status(404).json({ success: false, message: "Comment not found" });

        if(comment.user.toString() !== req.user._id.toString()) {
            console.log("comment.user.toString(): ", comment.user.toString());
            console.log("req.user._id: ", req.user._id.toString());
            return res.status(403).json({ success: false, message: "Not Authorized" });
        }

        comment.text = req.body.text || comment.text;
        await comment.save();

        res.json(comment);

    } catch (error) {
        res.status(500).json({ success: false, message: error.message, error: error.message});
    }
}
// Delete /api/comment/:commentId
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);
         if(!comment) return res.status(404).json({ success: false, message: "Comment not found" });

         if(comment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({success: false, message: "Not Authorized"});
         }

         await comment.deleteOne();
         res.json({success: true, message: "Comment deleted"});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
}