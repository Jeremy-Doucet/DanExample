"use strict";
var mongoose = require('mongoose');
var blogSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    timePosted: { type: Number, min: 16000 },
    content: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});
exports.Blog = mongoose.model('Blog', blogSchema);
