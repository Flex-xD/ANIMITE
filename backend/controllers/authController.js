import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const maxage = 7 * 24 * 60 * 60 * 1000
const createToken = async (email, userId) => {
    return jwt.sign({ email, userId }, process.env.JWT_SECRET, { expiresIn: maxage });
}

export const registerController = async (req, res) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ message: "Email, password and username are required !" });
        }
        if (password.length < 6) return res.status(400).json({ message: "Password length must be 6 or more !" })
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists !" });
        const newUser = await new User({
            email,
            password,
        });
        const token = await createToken(newUser.email, newUser._id);
        res.cookie("token", token, {
            maxage: maxage,
            secure: "None",
            sameSite: true,
            httpOnly: true
        })
        await newUser.save();
        return res.status(201).json({
            user: {
                email: newUser.email,
                username: newUser.username,
                password: newUser.password,
            }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error });
    }
}

export const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email, password and username are required !" });
        }
        const existingUser = await User.findOne({ email });
        const match = bcrypt.compare(password, existingUser.password);
        if (!existingUser) return res.status(400).json({ message: "User not found !" });
        if (!match) {
            return res.status(401).json({message:"Invalid Password !"})
        }
        const token = await createToken(existingUser.email, existingUser._id);
        res.cookie("token", token, ({
            maxage: maxage,
            httpOnly: true,
            sameSite: true,
            secure: "None"
        }))
        return res.status(200).json({
            user: {
                email: existingUser.email,
                username: existingUser.username,
                password: existingUser.password,
                profileImage: existingUser.profileImage,
                favouriteAnimes: existingUser.favouriteAnimes,
                favouriteAnimeCharacter: existingUser.favouriteAnimeCharacter,
                friends: existingUser.friends,
                blogs: existingUser.blogs
            }
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}

export const logoutController = (req, res) => {
    try {
        res.cookie("token", "", {
            maxAge: 0,
            httpOnly: true,
            secure: true, 
            sameSite: "strict" 
        });        return res.status(200).json({message:"User successfully logged-out !"})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}