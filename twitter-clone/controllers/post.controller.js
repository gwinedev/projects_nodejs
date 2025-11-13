// import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { img } = req.body;
    // Get user from the protectRoutes middleware
    const userId = req.user._id.toString();

    const user = req.user;
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!text && !img) {
      return res
        .status(400)
        .json({ error: "You have to provide a text or an image" });
    }

    if (img) {
      const uploadResponse = await cloudinary.uploader.upload(img);
      img = uploadResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json({ error: "Internal Server Error" });
    console.error("Issues with creating post controller" + error.message);
  }
};
