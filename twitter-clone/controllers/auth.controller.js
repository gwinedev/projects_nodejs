import User from "../models/user.model.js";
export const signup = async (req, res) => {
  try {
    const { username, password, fullname, email } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ username });
  } catch (error) {}
};

export const login = async (req, res) => {
  res.send({ message: "You've hit the login page" });
};

export const logout = async (req, res) => {
  res.send({ message: "You've hit the logout page" });
};
