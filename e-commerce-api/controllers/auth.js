const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  // Validate user input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }
  try {
    const user = new User({ email, name, password });
    console.log(`Password before saving ${user.password}`);
    await user.save();
    console.log(`Password after saving ${user.password}`);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "Email is not found" });
    } else {
      console.log("Login password (plain):", password); // From req.body
      console.log("User's hashed password:", user.password); // From DB

      const isMatch = await bcrypt.compare(password, user.password);
      // console.log(
      // `${isMatch}\n input password:${req.body.password}\n$stored password:${user.password}`
      // );
      if (!isMatch) {
        res.status(401).json({ message: "Invalid password" });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "24h",
        });
        res.json({ token });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in user" });
  }
};
module.exports = { login, register };
