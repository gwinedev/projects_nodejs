import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

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
  const userToModify = await User.findById(id);
  const currentUser = await User.findById(req.user._id);

  if (id === currentUser._id.toString()) {
    return res
      .status(400)
      .json({ error: "You cannot follow or unfollow yourself" });
  }
  if (!userToModify) return res.status(404).json({ error: "User not found" });
  if (!currentUser) return res.status(404).json({ error: "User not found" });

  const isFollowing = currentUser.following.includes(userToModify._id);
  if (isFollowing) {
    // Unfollow current user by 1. Pull currentUSer id from other user and vise versa
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: userToModify._id },
    });
    await User.findByIdAndUpdate(userToModify._id, {
      $pull: { followers: currentUser._id },
    });

    res.status(200).json({
      message: `You have unfollowed ${userToModify.username} successfully`,
    });
  } else {
    // follow user
    await User.findByIdAndUpdate(currentUser._id, {
      $push: { following: userToModify._id },
    });
    await User.findByIdAndUpdate(userToModify._id, {
      $push: { followers: currentUser._id },
    });
    const notification = new Notification({
      type: "follow",
      from: currentUser._id,
      to: userToModify._id,
    });
    await notification.save();
    res.status(200).json({
      message: `You have followed ${userToModify.username} successfully`,
    });
  }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password -email").populate({
    path: "followers following",
    select: "username",
  });
  res.status(200).json({ users });
};

export const updateUserProfile = async (req, res) => {
  const { fullname, username, email, bio, currentPassword, newPassword } =
    req.body;

  const userId = req.user._id;
  console.log(userId);
  let user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  if ((!currentPassword && newPassword) || (currentPassword && !newPassword)) {
    res
      .status(400)
      .json({ error: "Please provide both current password and new password" });
  }
  if (currentPassword && newPassword) {
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Your password is incorrect" });

    if (newPassword < 6)
      return res.status(400).json({
        error: "Your new password must be at least 6 characters long.",
      });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
  }
  user.username = username || user.username;
  user.fullname = fullname || user.fullname;
  user.email = email || user.email;
  user.bio = bio || user.bio;

  await user.save();
  user.password = null;

  res.status(200).json({ user });
};
export const suggestedUsers = async (req, res) => {};
