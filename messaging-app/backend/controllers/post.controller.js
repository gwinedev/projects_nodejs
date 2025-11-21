import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  const { text } = req.body;
  const userId = req.user._id.toString();
  const user = req.user;

  if (!user) return res.status(404).json({ error: "User not found" });

  if (!text)
    return res.status(400).json({ error: "You have to provide a text" });

  const newPost = new Post({ user: userId, text });
  await newPost.save();
  res.status(200).json({ newPost });
};

export const deletePost = async (req, res) => {
  const post = await User.findbyId(req.params.id);

  if (!post) return res.status(404).json({ error: "Post not found" });
  if (post.user.toString() !== req.user._id.toString()) {
    return res
      .status(400)
      .json({ error: "You are not authorized to delete this post." });
  }
  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Post deleted successfully." });
};

export const commentOnPost = async (req, res) => {};
export const likeUnlikePost = async (req, res) => {};
export const getLikedPosts = async (req, res) => {};
export const getMyPosts = async (req, res) => {
  const userId = req.user._id;

  const posts = await Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "username" })
    .populate({ path: "comments.user", select: "username" });

  if (posts.length === 0) return res.status(200).json([]);
  res.status(200).json({ posts });
};
export const getPosts = async (req, res) => {
  const userId = req.params.userId;

  const posts = await Post.find({ user: userId })
    .sort({ createdAt: -1 })
    .populate({ path: "user", select: "username" })
    .populate({ path: "comments.user", select: "username" });

  if (posts.length === 0) return res.status(200).json([]);
  res.status(200).json({ posts });
};
