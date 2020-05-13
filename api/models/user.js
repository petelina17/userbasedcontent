var mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  fullname: String,
  phoneNumber: String,
});

// Model
const User = mongoose.model("User", userSchema);

module.exports = User;
