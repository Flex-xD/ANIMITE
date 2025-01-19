import express from "express";
import * as authController from "../controllers/authController.js"

const router = express.Router();

router.post("/register" , authController.registerController);
router.post("/signup"  , authController.signupController);
router.post("/logout" , authController.logoutController);

export default router;