import Post from '../Models/Post.js';

// @route POST /api/posts/
// Create a new post
export const createPost = async (req, res) => {
    const {title, content} = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null ;

    try {
        const post = await Post.create({title, content, image,  author: req.user._id,});
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
}

// @route GET /api/posts/
// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username email");
        res.json(posts);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// GET /api/posts/:id
// get single post
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "username email");
        if(!post) return res.status(404).json({success: false, message: "Post not found"});

        res.json(post);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
};

// PUT /api/posts/:id
// Update post
export const updatePost = async (req,res) => {
    const {title, content} = req.body;

        const image = req.file ? `/uploads/${req.file.filename}` : null ;

    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(400).json({success: false, message: "Post not found"});

        if(post.author.toString() !== req.user._id.toString()) {
            return res.status(401).json({success:false, message: "Not authorized to update this post"});
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.image = image || post.image;

    


        const updatedPost = await post.save(); 
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
// DELETE /api/post/:id
// Delete post
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({success: false, message: "Post not found"});

        if(post.author.toString() !== req.user._id.toString()){
            return res.status(401).json({success: false, message: "Not authorized to delete this post"});
        }

        await post.deleteOne();
        res.json({success: true, message: "Post deleted"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

// GET posts bu user
export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.params.userId}).sort({createdAt: -1});
        res.json(posts);
    } catch (error) {
        res.status(500).json({success: false, message: "Error fetching user posts"});
    }
}