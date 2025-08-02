import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

//Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET, { expiresIn: "1d"});
}

// Register User
export const registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validation Checks
    if(!fullName || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists | Try a different email" });
        }

        // Create new user
        const user = await User.create({
            fullName,
            email,
            password // Password will be hashed automatically by the pre-save hook
        });

        // Generate JWT token
        return res.status(201).json({
            id : user._id,
            user,
            token: generateToken(user._id)
        })


    } catch (error) {
        return res.status(500).json({ message: "Server error :" + error.message });
    }
}

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validation Checks
    if(!email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user exists in db and password matches or not
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        return res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error :" + error.message });
    }
}

// Get User Profile
export const getUserProfile = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Server error :" + error.message });
    }
}