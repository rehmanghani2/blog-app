import User from "../Models/User.js";
import jwt from 'jsonwebtoken';

// generate JWT
const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "5d",
    });
}

// @route POST /api/auth/register
export const registerUser = async (req, res) => {

    if (!req.body) {
    return res.status(400).json({ success: false, message: "Request body is missing" });
  }
    const { username, email, password } = req.body;
    console.log("req.body: ", req.body);
    try {
        // Check if user already exists
        const userExists = await User.findOne({email});
        if(userExists)
            return res.status(400).json({success: false, message: "User already exists"});
        // Create new user
        const user = await User.create({username, email, password});
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}
// @route POST /api/auth/login
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        // Find user
        const user = await User.findOne({email});

        if(!user) 
            return res.status(400).json({success: true, message: "Invalid credentials"});
        
        const isMatch = await user.matchPassword(password);
        if(!isMatch)
            return res.status(400).json({success: false,  message: "Invalid credentials"});

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message});
    }
}