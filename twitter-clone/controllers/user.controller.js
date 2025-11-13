import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  // Logic to get user profile by username
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getUserProfile: ", error.message);
    return res.status(500).json({ error: "Server error" });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params; // ID of the user to follow/unfollow
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id); //id from the protect middleware

    if (id === currentUser._id.toString()) {
      return res
        .status(400)
        .json({ error: "You cannot follow/unfollow yourself" });
    }
    if (!userToModify)
      return res.status(404).json({ error: "User to follow not found" });
    if (!currentUser)
      return res.status(404).json({ error: "Current User not found" });

    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, {
        $pull: { following: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $pull: { followers: id },
      });

      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await notification.save();
      res
        .status(200)
        .json({ message: `${userToModify._id} unfollowed successfully` });
    } else {
      // follow user
      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(currentUser._id, {
        $push: { following: id },
      });
      //   send notification to the user being followed

      const notification = new Notification({
        type: "follow",
        from: currentUser._id,
        to: userToModify._id,
      });
      await notification.save();

      res
        .status(200)
        .json({ message: `${userToModify._id} followed successfully` });
    }
  } catch (error) {
    console.error("Error in followUnfollowUser: ", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUSers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error in getAllUsers: ", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const usersFollowedByMe = await User.findById(userId).select("following");
    // Get users not followed by the current user
    const users = await User.aggregate([
      // Exclude current user from suggestions
      {
        $match: {
          _id: { $ne: userId }, // Exclude current user
        },
      },
      { $sample: { size: 10 } },
    ]);
    // if id is not in the following list then include in the filtered list
    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 5); // Limit to 5 suggestions

    suggestedUsers.forEach((user) => {
      user.password = undefined || null;
    });

    res.status(200).json({ users: suggestedUsers });
  } catch (error) {
    console.error("Error in getSuggestedUsers: ", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  const { fullname, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg } = req.body;

  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (
      (!currentPassword && newPassword) ||
      (currentPassword && !newPassword)
    ) {
      res.status(400).json({
        error: "Please provide both current password and new password",
      });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res
          .status(400)
          .json({ error: "Your current password is incorrect" });
      if (newPassword.length < 6)
        return res.status(400).json({
          error: "Your new password should be at least 6 characters long",
        });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        if (typeof user.profileImg === "string" && user.profileImg.length > 0) {
          await cloudinary.uploader.destroy(
            user.profileImg.split("/").pop().split(".")[0]
          );
        }
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        if (typeof user.coverImg === "string" && user.coverImg.length > 0) {
          await cloudinary.uploader.destroy(
            user.coverImg.split("/").pop().split(".")[0]
          );
        }
      }
      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
    user.password = null;

    return res.status(200).json(user);
  } catch (error) {
    console.error("Issue with updating\n", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
