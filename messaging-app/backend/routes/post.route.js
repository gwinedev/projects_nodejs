import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import {
  getPosts,
  createPost,
  deletePost,
  getMyPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/posts", protectRoute, asyncHandler(getMyPosts));
router.get("/posts/:userId", protectRoute, asyncHandler(getPosts));
router.post("/create", protectRoute, asyncHandler(createPost));
router.delete("/delete", protectRoute, asyncHandler(deletePost));

export default router;
