import { Request , Response } from "express";
import {registerControllerType} from "../types/types.js";

export const registerController = async (req:Request , res:Response) => {
    const {email , username , password} = req.body as registerControllerType;
    if (!email || !username || !password) {
        return res.status(400).json({msg : "Please fill in all the fields !"});
    }
}