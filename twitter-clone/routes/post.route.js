import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  createPost,
  getPosts,
  deletePost,
  commentOnPost,
  likeUnlikePost,
  getLikedPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
const router = express.Router();

router.get("/", protectRoute, getPosts);
router.get("/likes/:id", protectRoute, getLikedPosts);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/create", protectRoute, createPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);

export default router;
