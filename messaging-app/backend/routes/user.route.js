import express from "express";
import {
  getUserProfile,
  followUnfollowUser,
} from "../controllers/user.controller.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, asyncHandler(getUserProfile));
router.get("/follow/:id", protectRoute, asyncHandler(followUnfollowUser));

export default router;
