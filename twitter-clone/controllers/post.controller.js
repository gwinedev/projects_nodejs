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

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(400).json({ error: "Post not found" });

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You are not authorized to delete post" });
    }
    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error in deletePost controller", error.message);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (error) {
    console.error("Error in getPosts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) return res.status(400).json({ error: "Text field is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(400).json({ error: "Post not found" });

    console.log(post.comments);
    
    const comment = { user: userId, text };
    post.comments.push(comment);

    await post.save()
    res.status(200).json(post)
  } catch (error) {
    console.error("Error with commentOnPost controller", error.message);
    res.status(400).json({ error: "Internal Server error" })
  }
};
