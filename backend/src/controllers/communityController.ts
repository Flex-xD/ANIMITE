import { Request, Response } from "express";
import { IAuthRequest } from "../middlewares/authMiddleware.js";
import User, { IUser } from "../models/User.js";
import Community from "../models/Community.js";
import mongoose from "mongoose";
import { string } from "zod";

export const createCommunityController = async (req: IAuthRequest, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        if (!req.userId) {
            return res.status(400).json({ msg: "You are unauthorized !" })
        }

        const admin = await User.findById(req.userId) as IUser;
        if (!admin) {
            return res.status(400).json({ msg: "You need to be authenticated !" });
        }

        const { name, description } = req.body;
        if (!name || typeof name !== "string") {
            return res.status(400).json({ msg: "Community name is required !" });
        }

        if (name.trim().length < 3) { 
            return res.status(400).json({ msg: "Community name must be at least 3 characters" });
        }

        const exisitingCommunity = await Community.findOne({ name: name });
        if (exisitingCommunity) {
            return res.status(400).json({ msg: "Community name already exists !" })
        }

        const community = new Community({
            name,
            description,
            admin: admin.username,
            members: [admin._id],
        });

        await (community as any).save({ session });

        if (community) {
            if (community?.id) {
                admin.communitiesCreated?.push(community.id);
                admin.communitiesJoined?.push(community.id);
            }
        }
        if (!admin.communitiesCreated) admin.communitiesCreated || [];
        if (!admin.communitiesJoined) admin.communitiesJoined || [];

        await admin.save({ session });
        await session.commitTransaction();

        const sanitizedCommunity = {
            name: community.name,
            description: community.description || "",
            admin: admin.username,
            members: [admin._id]
        }
        return res.status(201).json({
            success:true ,
            msg: "Community created !",
            community: sanitizedCommunity
        })

    } catch (error) {
        await session.abortTransaction();
        console.log({ error });
        return res.status(500).json({
            success:false ,
            error: error 
        });
    } finally {
        await session.endSession();
    }
}

export const getCommunityController = async (req:IAuthRequest , res:Response) => {
    try {
        const {name} = req.body;
        if(!name) return;
    } catch (error) {
        
    }
}