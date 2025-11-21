import express from "express";
import {
  getUserProfile,
  followUnfollowUser,
  getAllUsers,
  updateUserProfile,
  suggestedUsers,
} from "../controllers/user.controller.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", asyncHandler(getAllUsers));
router.get("/profile/:username", protectRoute, asyncHandler(getUserProfile));
router.post("/follow/:id", protectRoute, asyncHandler(followUnfollowUser));
router.patch("/update", protectRoute, asyncHandler(updateUserProfile));
router.get("/suggested", protectRoute, asyncHandler(suggestedUsers));

export default router;
