import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { deleteBlogController, getBlogController, postBlogController } from "../controllers/blogController.js";
const router = express.Router();

router.post("/create-blog", verifyToken , postBlogController);
router.get("/get-all-blogs" , verifyToken , getBlogController);
router.post("/delete-blog/:blogId" , verifyToken , deleteBlogController);

export default router;