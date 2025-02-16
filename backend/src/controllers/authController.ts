import { Request , Response } from "express";
import {registerControllerType} from "../types/types.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const maxage = 3 * 24 * 60 * 60 * 1000;
const createtoken = async (userId:string , email:string) => {
    return jwt.sign({userId , email} , process.env.JWT_SECRET as string , {expiresIn:maxage});
}

export const registerController = async (req:Request , res:Response) => {
    const {email , username , password} = req.body as registerControllerType;
    if (!email || !username || !password) {
        return res.status(400).json({msg : "Please fill in all the fields !"});
    }
    const existingUser = await User.findOne({email , username});
    if(existingUser) {
        return res.status(400).json({msg:"User already exists !"})
    }
    const usernameRegex = /^[a-z_.]+$/;
        if (!usernameRegex.test(username)) {
            return res.status(400).json({ msg: "Username can only contain lowercase letters, underscores (_), and dots (.)" });
        }
    const user = await User.create({
        email , 
        username , 
        password , 
        role:"user" , 
        friends:[] ,
        badges:[] , 
        profilePicture:""
    });
    const token = await createtoken(user._id as string, user.email);
    res.cookie("token" , token , {
        httpOnly:true , 
        maxAge:maxage ,
        sameSite:"strict" ,
        secure:true
    })
    console.log("User Registered !");
    return res.status(201).json({msg:"User Registered !" , user})
}