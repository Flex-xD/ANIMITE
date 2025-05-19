import { Response } from "express";
import { IAuthRequest } from "../middlewares/authMiddleware.js";
import User, { IUser } from "../models/User.js";
import Community, { ICommunity } from "../models/Community.js";
import mongoose, { mongo, ObjectId } from "mongoose";
import { string } from "zod";
import { error, timeStamp } from "console";
import { ICommunityName } from "../routes/types/types.js";
import { handleError } from "../middlewares/handleError.js";



// ? Logic for getting all the communities 
// ! Improvments : Make types for the community and make it compatible with the code written 
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
        const communityRegex = /^[a-zA-Z_.]+$/
        if (!communityRegex.test(name)) {
            res.status(400).json({
                msg: "Community names can only contain letters, underscores (_), and dots (.)"
            })
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
            success: true,
            msg: "Community created !",
            community: sanitizedCommunity
        })

    } catch (error) {
        await session.abortTransaction();
        console.log({ error });
        return res.status(500).json({
            success: false,
            error: error
        });
    } finally {
        await session.endSession();
    }
}

export const getCommunityController = async (req: IAuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.userId) {
            res.status(400).json({ msg: "You need to be Authenticated  !" })
        }
        const { communityName } = req.body as ICommunityName;
        if (!communityName || typeof communityName !== "string" || communityName.trim() == "") {
            res.status(400).json({
                success: false,
                msg: "Please enter a valid community name !"
            });
            return;
        }
        const communities = await Community.find({ name: { $regex: new RegExp(communityName.trim(), "i") } })
            .sort({ timeStamp: 1 })
            .select('name timeStamp')
            .lean()

        if (!communities.length) {
            res.status(400).json({
                success: false,
                msg: `No communites found matching ${communityName}`,
                data: []
            });
            return;
        }
        res.status(200).json({
            success: true,
            msg: "Community successfully retrived !",
            data: communities
        })
    } catch (error) {
        console.log("Error in the community controller ", handleError(error));
        res.status(500).json({
            success: false,
            msg: "An Internal server error occured !",
            error: handleError(error)
        })
    }
}

export const joinCommunityController = async (req: IAuthRequest, res: Response): Promise<any> => {

    try {
        if (!req.userId) {
            console.log(req.userId)
            return res.status(400).json({ msg: "You are unauthorized !" })
        }
        const member = await User.findById(req.userId) as IUser;
        if (!member) {
            return res.status(400).json({ msg: "You need to be authenticated !" });
        }

        const { communityName } = req.body as ICommunityName;
        if (!communityName || typeof communityName !== "string" || communityName.trim() == "") {
            res.status(400).json({
                success: false,
                msg: "Please enter a valid community name !"
            });
            return;
        }

        const session = Community.startSession();
        (await session).startTransaction();

        try {
            const community = await Community.find({ name: { $regex: new RegExp(communityName.trim(), "i") } }) as ICommunity[]

            if (!community) {
                (await session).abortTransaction();
                return res.status(400).json({
                    success: false,
                    msg: `No communites found matching ${communityName}`,
                    data: []
                });
            }

            if (community[0].members.includes(member._id as mongoose.Types.ObjectId)) {
                res.status(400).json({
                    msg: "You cannot join a community twice !"
                })
                return;
            }

            community[0].members.push(new mongoose.Types.ObjectId(req.userId));
            if (community[0].id) {
                member.communitiesJoined?.push(community[0].id);
            }

            (await session).commitTransaction();

            res.status(200).json({
                msg: "Community Joined Successfully !",
                success: true,
                data: {
                    communityName: community[0].name,
                    communityId: community[0].id,
                    membersCount: community[0].members.length + 1,
                    joinedAt: new Date()
                }
            })

        } catch (error) {
            (await session).abortTransaction();
            throw Error;
        } finally {
            (await session).endSession();
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).json({
            msg: "Internal server error while joining community !",
            success: false,
            error: handleError(error)
        })
    }
}

export const leaveCommunityController = async (req: IAuthRequest, res: Response): Promise<any> => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                msg: "Authentication required",
                success: false
            });
        }

        const user = await User.findById(req.userId) as IUser;
        if (!user) {
            return res.status(401).json({
                msg: "User not found"
            });
        }

        const { communityName } = req.body as ICommunityName;
        if (!communityName || typeof communityName !== "string" || communityName.trim() === "") {
            return res.status(400).json({
                success: false,
                msg: "Please enter a valid community name"
            });
        }

        let session;
        try {
            session = await Community.startSession();
            session.startTransaction();

            const community = await Community.findOne({
                name: { $regex: new RegExp(communityName.trim(), "i") }
            });

            if (!community) {
                await session.abortTransaction();
                return res.status(404).json({
                    success: false,
                    msg: `No community found matching ${communityName}`,
                    data: []
                });
            }

            const userObjId = user._id as mongoose.Types.ObjectId;
            if (!community.members.includes(userObjId)) {
                await session.abortTransaction();
                return res.status(400).json({
                    msg: "You are not a part of this community!",
                    success: false
                });
            }

            community.members = community.members.filter(member =>
                member.toString() !== userObjId.toString()
            );

            if (user.role === "admin") {
                user.communitiesCreated = (user.communitiesCreated || []).filter(communityId =>
                    communityId.toString() !== community._id.toString()
                );
            }
            user.communitiesJoined = (user.communitiesJoined || []).filter(communityId =>
                communityId.toString() !== community._id.toString()
            );

            await Promise.all([
                community.save({ session }),
                user.save({ session })
            ]);

            await session.commitTransaction();

            return res.status(200).json({
                msg: "Community left successfully!",
                success: true
            });

        } catch (error) {
            if (session) await session.abortTransaction();
            throw error;
        } finally {
            if (session) await session.endSession();
        }
    } catch (error) {
        console.error("Error leaving community:", error);
        return res.status(500).json({
            msg: "Internal server error while leaving community",
            success: false,
            error: handleError(error)
        });
    }
};