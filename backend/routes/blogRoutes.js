import {Router} from "express";
import {verifyToken} from "../middlewares/authMiddleware.js"
import * as blogController from "../controllers/blogController.js"

const blogRoutes = Router();

blogRoutes.post("/post-blog" , verifyToken , blogController.postBlogController);
blogRoutes.get("/all-blogs"  , verifyToken , blogController.getAllBlogsController);

export default blogRoutes;