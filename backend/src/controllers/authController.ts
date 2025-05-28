import { Request, Response } from "express";
import { registerControllerType } from "../types/types.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";

const maxage = 3 * 24 * 60 * 60 * 1000;
const createtoken = async (userId: string, email: string) => {
    return jwt.sign({ userId, email }, process.env.JWT_SECRET as string, { expiresIn: maxage });
}

export const registerController = async (req: Request, res: Response) => {
    const { email, username, password } = req.body as registerControllerType;
    if (!email || !username || !password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please fill in all the fields !" });
    }
    const existingUser = await User.findOne({
        $or: [{ email }, { username }]
    });

    if (existingUser) {
        if (existingUser.email === email) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Email already exists!" });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username already taken!" });
        }
    }
    const usernameRegex = /^[a-z_.]+$/;
    if (!usernameRegex.test(username)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Username can only contain lowercase letters, underscores (_), and dots (.)" });
    }
    const user = await User.create({
        email,
        username,
        password,
        role: "user",
        friends: [],
        badges: [],
        profilePicture: "",
        blogs: [],
    });
    const token = await createtoken(user._id as string, user.email);
    res.cookie("token", token, {
        httpOnly: true,
        maxAge: maxage,
        sameSite: "strict",
        secure: false
    })
    console.log("User Registered !");
    return res.status(StatusCodes.CREATED).json({ msg: "User Registered !", user })
}

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password, username } = req.body as registerControllerType;
        if (!email && !username || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please fill in all the fields!" })
        }
        const user = await User.findOne({ $or: [{ email }, { username }] });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User does not exist !" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid credentials !" });
        }
        const token = await createtoken(user._id as string, user.email);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: maxage,
            sameSite: "strict",
            secure: false
        });
        return res.status(StatusCodes.OK).json({ msg: "User Logged In !", user });
    } catch (error) {

        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error !" });
    }
}

export const logoutController = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
        return res.status(StatusCodes.OK).json({ msg: "User Logged Out !" });
    } catch (error) {
        console.log({ error });
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Internal Server Error !" });
    }
}
