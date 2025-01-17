import User from "../models/User.js";
import jwt from "jsonwebtoken";

const maxage = 7*24*60*60*1000
const createToken = async (email , userId) => {
    return jwt.sign({email , userId} , process.env.JWT_SECRET , {expiresIn:maxage});
}

export const registerController = async (req , res) => {
    try {
        const {email , password , username} = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({message:"Email, password and username are required !"});
        }
        if (password.length < 6) return res.status(400).json({message : "Password length must be 6 or more !"})
        const existingUser = await User.findOne({email});
        if (existingUser) return res.status(400).json({message:"User already exists !"});
        const newUser = await new User({
            email, 
            password,
        });
        const token = await createToken(newUser.email , newUser._id);
        res.cookie("token" , token , {
            maxage:maxage , 
            secure:"None" ,
            sameSite:true ,
            httpOnly:true
        })
        return res.status(201).json({user : {
            email:newUser.email ,
            username:newUser.username, 
            password:newUser.password ,
            profileImage,
            favouriteAnimes ,
            favouriteAnimeCharacter ,
            friends ,
            blogs
        }});
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({error});
    }
}

export const signupController = async (req , res) => {
    try {
        const {email , password , username} = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({message:"Email, password and username are required !"});
        }
        const existingUser = await User.findOne({email});
        if (!existingUser) return res.status(400).json({message:"User not found !"});
        const token = await createToken(existingUser.email , existingUser._id);
        res.cookie("token" , token , ({
            maxage:maxage , 
            httpOnly:true ,
            sameSite:true ,
            secure:"None" 
        }))
        return res.status(200).json({user:{
            email:existingUser.email ,
            username:existingUser.username, 
            password:existingUser.password ,
            profileImage:existingUser.profileImage,
            favouriteAnimes :existingUser.favouriteAnimes,
            favouriteAnimeCharacter:existingUser.favouriteAnimeCharacter ,
            friends:existingUser.friends ,
            blogs:existingUser.blogs
        }})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message:error.message});
    }
}