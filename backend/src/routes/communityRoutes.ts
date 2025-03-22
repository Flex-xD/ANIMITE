import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createCommunityController, getCommunityController, joinCommunityController, leaveCommunityController } from "../controllers/communityController.js";
const router = express.Router();

router.post("/create-community" , verifyToken , createCommunityController);
router.get("/get-community" , verifyToken , getCommunityController);
router.post("/join-community" , verifyToken , joinCommunityController);
router.post("/leave-community" , verifyToken , leaveCommunityController);

export default router;