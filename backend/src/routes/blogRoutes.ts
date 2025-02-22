import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getBlogController, postBlogController } from "../controllers/blogController.js";
const router = express.Router();

router.post("/create-blog", verifyToken , postBlogController);
router.get("/get-all-blogs" , verifyToken , getBlogController);

export default router;