import { verify } from "crypto";
import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createCommunityController } from "../controllers/communityController.js";
const router = express.Router();

router.post("/create-community" , verifyToken , createCommunityController);

export default router;