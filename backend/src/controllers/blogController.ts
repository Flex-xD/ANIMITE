import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import Blog, { Iblog } from "../models/Blog.js";
import mongoose from "mongoose";

interface AuthRequest extends Request {
    userId?: string
}

export const postBlogController = async (req: AuthRequest, res: Response) => {
    try {
        const { title, description, images, body } = req.body;
        if (!title || !body) {
            return res.status(400).json({ msg: "Title and Body are must !" });
        }
        const user: IUser | null = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({ msg: "User not found !" });
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const blog = new Blog({
                title,
                description,
                images,
                body,
                author: req.userId
            });
            await blog.save({session});
            if (!user.blogs) {
                user.blogs = []
            }
            user.blogs?.push(blog._id);
            await user.save({ session });
            await session.commitTransaction();
            return res.status(201).json({ msg: "Blog created Successfully !", blog: blog })
        } catch (error) {
            await session.abortTransaction()
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ msg: "Internal Server error !" });
    }
}


// ! Add the query Logic 

export const getBlogController = async (req: AuthRequest, res: Response) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const skip = (Number(page) - 1) * Number(limit);
        const user = await User.findById(req.userId).populate({
            path: "blogs",
            select: "title description createdAt",
            options: { limit: Number(limit), skip }
        }).exec();
        if (!user) {
            return res.status(404).json({ msg: "User not found !" });
        }
        const blogs = user.blogs || [];
        return res.status(200).json({
            msg: blogs.length ? "Blogs retrived successfully !" : "No blogs found !",
            blogs,
            total: blogs.length,
            page: Number(page),
            limit: Number(limit)
        })
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ msg: "Internal Server error !" })
    }
}


export const deleteBlogController = async (req: AuthRequest, res: Response) => {
    try {
        const { blogId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ msg: "Blog ID is not valid !" });
        }
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({ msg: "Blog not found !" });
        }

        if (blog.author.toString() !== req.userId) {
            return res.status(403).json({ msg: "You can only delete your own blog !" });
        }
        const session = await mongoose.startSession();
        session.startTransaction()
        try {
            await User.findByIdAndUpdate(req.userId, { $pull: {blogs: blogId }}, {session});
            await blog.deleteOne({session});
            await session.commitTransaction();
            return res.status(200).json({msg:"Blog deleted Successfully !" , blogId});
        } catch (error) {
            await session.abortTransaction();
            throw error;
        } finally {
            session.endSession();
        }
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ msg: "Internal Server error !" })
    }
}