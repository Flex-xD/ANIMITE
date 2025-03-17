import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createCommunityController, getCommunityController } from "../controllers/communityController.js";
const router = express.Router();

router.post("/create-community" , verifyToken , createCommunityController);
router.get("/get-community" , verifyToken , getCommunityController);

export default router;