var mongoose = require('mongoose')

// Schema
const postSchema = new mongoose.Schema({
  title: String,
  date: String,
  author: String,
  content: String
});

// Model
const Post = mongoose.model('Post', postSchema);

module.exports = Post