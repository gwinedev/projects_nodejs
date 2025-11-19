import express from "express";
import {
  getUserProfile,
  followUnfollowUser,
  getAllUsers,
} from "../controllers/user.controller.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/profile/:username", protectRoute, asyncHandler(getUserProfile));
router.get("/follow/:id", protectRoute, asyncHandler(followUnfollowUser));

export default router;
