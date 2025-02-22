import { Request, Response } from "express";
import User, { IUser } from "../models/User.js";
import Blog, { Iblog } from "../models/Blog.js";
import { ADDRGETNETWORKPARAMS } from "dns";

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
        const blog: Iblog = await Blog.create({
            title,
            description,
            images,
            body , 
            author:req.userId
        });
        if (!user.blogs) {
            user.blogs = []
        }
        user.blogs?.push(blog._id);
        await user.save();

        console.log("Blog created successfully !");
        return res.status(201).json({ msg: "Blog successfully created !", blog });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ msg: "Internal Server error !" });
    }
}

export const getBlogController = async (req: AuthRequest, res: Response) => {
    try {
        const user = await User.findById(req.userId).populate("blogs").exec();
        if (!user) {
            return res.status(404).json({ msg: "User not found !" });
        }
        if (!user.blogs || user.blogs.length === 0) {
            return res.status(200).json(
                {
                    msg: "Blogs not found for this user !",
                    blogs: []
                }
            );
        }
        return res.status(200).json({ msg: "Blogs retrived successfully !", blogs: user.blogs });
    } catch (error) {
        console.log({ error });
        return res.status(500).json({ msg: "Internal Server error !" })
    }
}


export const deleteBlogController = async (req: AuthRequest, res: Response) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(400).json({msg:"Blog not found !"});
        }

        if(blog.author.toString() !== req.userId) {
            return res.status(403).json({msg:"You can only delete your own blog !"});
        }

        await User.findByIdAndUpdate(req.userId , {$pull:{blogs:blogId}});
        await blog.deleteOne();

        return res.status(200).json({msg:"Blog deleted Successfully !"});


    } catch (error) {

    }
}