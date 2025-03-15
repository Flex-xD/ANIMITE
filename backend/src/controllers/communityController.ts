import {Request ,Response} from "express";

export const createCommunityController = async (req :Request , res:Response) => {
    const {name , description , rules} = req.body;
}