import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    userId?: string | null;
}

export const verifyToken = (req:AuthRequest , res:Response , next:NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({msg:"Unauthorized !"});
        } 
        const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as {userId:string};
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log({error});
        return res.status(500).json({msg:"Internal Server Error !"});
    }
}