"use strict";
var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    text: String,
    postedBy: String,
    timePosted: Number,
    Blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});
exports.Comment = mongoose.model('Comment', commentSchema);
