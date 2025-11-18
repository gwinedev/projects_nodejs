import express from "express";
import asyncHandler from "../lib/utils/asyncHandler.js";

import {
  login,
  signup,
  signout,
  getMe,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", asyncHandler(signup));
router.post("/login", asyncHandler(login));
router.post("/signout", asyncHandler(signout));
router.get("/me", protectRoute, asyncHandler(getMe));

export default router;
