import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import asyncHandler from "../lib/utils/asyncHandler.js";
import { getPosts, createPost, deletePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", protectRoute, asyncHandler(getPosts));
router.post("/create", protectRoute, asyncHandler(createPost));
router.delete("/delete", protectRoute, asyncHandler(deletePost));

export default router;