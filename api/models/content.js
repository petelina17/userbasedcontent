var mongoose = require("mongoose");

// Schema
const contentSchema = new mongoose.Schema({
  title: String,
  username: String,
  text: String,
  date: String,
});

// Model
const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
