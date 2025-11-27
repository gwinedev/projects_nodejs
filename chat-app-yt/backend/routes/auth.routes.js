// const express = require("express");
import express from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
  getUsers,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.post("/logout", logoutUser);
router.get("/getusers", getUsers);

export default router;
