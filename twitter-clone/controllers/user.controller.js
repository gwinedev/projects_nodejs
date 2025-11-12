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

    if (id === req.user._id.toString()) {
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
      await User.findByIdAndUpdate(id, { $pull: { following: req._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { followers: id } });

      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      res.status(200).json({ message: "User unfollowed successfully" });
      await notification.save();
    } else {
      // follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      //   send notification to the user being followed

      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await notification.save();

      res.status(200).json({ message: "User followed successfully" });
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
