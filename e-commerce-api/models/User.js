const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("paswsord")) {
    this.password = await bycrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema)
