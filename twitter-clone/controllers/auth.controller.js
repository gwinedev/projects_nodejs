import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import { error } from "console";

export const signup = async (req, res) => {
  try {
    const { username, password, fullname, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ error: "Email already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullname: fullname,
      username: username,
      email: email,
      password: hashPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        email: newUser.email,
        password: hashPassword,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.error("Error in signup");
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  res.send({ message: "You've hit the login page" });
};

export const logout = async (req, res) => {
  res.send({ message: "You've hit the logout page" });
};
