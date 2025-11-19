import express from "express";
import {
  getUserProfile,
  followUnfollowUser,
  getAllUsers,
  updateUserProfile,
} from "../controllers/user.controller.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile/:username", protectRoute, asyncHandler(getUserProfile));
router.get("/follow/:id", protectRoute, asyncHandler(followUnfollowUser));
router.post("/update", protectRoute, asyncHandler(updateUserProfile));

export default router;
