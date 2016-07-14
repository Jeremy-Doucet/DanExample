"use strict";
var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    text: String,
    timePosted: Number,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});
exports.Comment = mongoose.model('Comment', commentSchema);
