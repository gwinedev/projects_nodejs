// const express = require("express");
import express from "express";
import { loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/login", loginUser);
router.get("/signup", signupUser);
router.get("/logout", logoutUser);

export default router;
