const mongoose = require('mongoose');

// Define the schema for the users table
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minLength: 1, maxLength: 50 },
    email: { type: String, required: true, unique: true, minLength: 1, maxLength: 100 },
    password: { type: String, required: true, minLength: 1, maxLength: 100 },
    created_at: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Define the schema for the posts table
const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    image: { type: String }, // Assuming image is stored as a path or URL
    username: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// Define the schema for the comments table
const commentSchema = new mongoose.Schema({
    content: { type: Array, default: [], required: true },
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    created_at: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// Define the schema for the likes table
const likeSchema = new mongoose.Schema({
    post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    user_id: { type: String, ref: "User" },
    created_at: { type: Date, default: Date.now }
});

likeSchema.index({ post_id: 1, user_id: 1 }, { unique: true }); // Ensures that a user can only like a post once

const Like = mongoose.model('Like', likeSchema);

module.exports = { User, Post, Comment, Like };
