import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

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

export const commentOnPost = async (req, res) => {
  const { text } = req.body;

  const postId = req.params.postId;
  const userId = req.user._id;

  if (!text) return res.status(400).json({ error: "Text field is required" });

  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const comment = { user: userId, text: text };
  post.comments.push(comment);
  await post.save();
  res.status(200).json({ post });
};
export const likeUnlikePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user._id;

  const post = await Post.findbyId(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });

  const userLikedPost = post.likes.incudes(userId);

  if (userLikedPost) {
    await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
    await Post.updateMany({ _id: userId }, { $pull: { LikedPosts: postId } });
    res.status(200).json({ message: "Post unliked successfully" });
  } else {
    await Post.updateOne({ _id: podtId }, { $push: { likes: userId } });
    await Post.updateOne({ _id: userId }, { $push: { LikedPosts: postId } });
    res.status(200).json({ message: "Post liked successfully" });
  }
  const notification = new Notification({
    from: userId,
    to: post.user,
    type: "like",
  });
  await notification.save();
  res.status(200).json({ message: "You liked this post" });
};
export const getLikedPosts = async (req, res) => {
  const user = req.user;

  const likedPosts = await Post.find({
    // Find all posts whose ID is inside the user’s list of liked post IDs
    _id: { $in: user.likedPosts },
  })
    .populate({
      path: "user",
      select: "-password",
    })
    .populate({
      path: "comments.user",
      select: "-password",
    });
  res.status(200).json({ likedPosts });
};
