import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenandSetCookie } from "../lib/utils/generateToken.js";

export const signup = async (req, res) => {
  const { username, password, email, fullname, bio } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ error: "Please enter the correct email format." });
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }
  const existingEmail = await User.findOne({ email });
  if (existingEmail) {
    return res.status(400).json({ error: "Email already exists" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must be at least 6 characters long." });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    fullname,
    password: hashPassword,
    username,
    email,
    bio,
  });

  if (!newUser) {
    throw new Error("Could not create instaance in Mongoose");
  }

  generateTokenandSetCookie(newUser._id, res);
  await newUser.save();

  res.status(200).json({
    _id: newUser._id,
    fullname: newUser.fullname,
    username: newUser.username,
    email: newUser.email,
    followers: newUser.followers,
    following: newUser.following,
    bio: newUser.bio,
  });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password || ""
  );
  // if (!user || !isPasswordCorrect) {
  //   res.status(400).json({ error: "Invalid username or password" });
  // }

  if (!user) {
    res.status(400).json({ error: "Invalid username" });
  }

  if (!isPasswordCorrect) {
    res.status(400).json({ error: "Invalid password" });
  }
  generateTokenandSetCookie(user._id, res);

  res.status(200).json({
    _id: user._id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    followers: user.followers,
    following: user.following,
    bio: user.bio,
  });
};
