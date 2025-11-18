import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select("-password -email");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ user });
};

export const followUnfollowUser = async (req, res) => {
  const { id } = req.params; //id of who to follow or unfollow
  const userToModify = await User.findbyId(id);
  const currentUser = await User.findbyId(req.user._id);

  if (id === currentUser._id.toString()) {
    return res
      .status(400)
      .json({ error: "You cannot follow or unfollow yourself" });
  }
  if (!userToModify) return res.status(404).json({ error: "User not found" });
  if (!currentUser) return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(id);
  if (isFollowing) {
    // Unfollow current user by 1. Pull currentUSer id from other user and vise versa
    await User.findByIdAndUpdate(id, {
      $pull: { following: currentUser._id },
    });
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: id },
    });
  }
};
