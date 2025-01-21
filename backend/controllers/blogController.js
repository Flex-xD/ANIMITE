import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const postBlogController = async (req ,res) => {
    try {
        const {title , content } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({message:"User not found !"})
        }
        if (!title  || !content || !author) {
            return res.status(400).json({message:"Titile , content and Author are required to post a blog !"})
        }
        const author = user.username;
        const newBlog = await Blog.create({
            title , 
            content , 
            author , 
            date
        })

        user.blogs.push(newBlog._id);
        await user.save();
        return res.status(201).json({message:"Blog Sucessfully created" , blog:newBlog})
    } catch (error) {
        console.log({message:error.message});
        return res.status(500).json({message:error.message});
    }
}

export const getAllBlogsController = async (req ,res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status
            (404).json({message:"User not found !"})
        }
        const blogsId = user.blogs;
        const blogs = await Blog.find({_id : {$in : user.blogs}});
        return res.status(200).json({message:"All Blogs found !" , blogs});
    } catch (error) {
        console.log({message:error.message});
        return res.status(500).json({message:error.message});
    }
}