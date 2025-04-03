import { Request, Response } from "express";
import axios from "axios";

export const getAnimeNewsController = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Internal Server Error",
        })
    }
}


