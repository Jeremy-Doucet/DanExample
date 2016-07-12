"use strict";
var comment_model_1 = require('./comment.model');
var blog_model_1 = require('../blogs/blog.model');
function create(req, res, next) {
    var c = new comment_model_1.Comment(req.body);
    c.Blog = req.params.blogId;
    c.save(function (err, comment) {
        if (err)
            return next(err);
        blog_model_1.Blog.update({ _id: req.params.blogId }, { $push: { Comments: c._id } }, function (err, result) {
            if (err)
                return next(err);
            if (result.nModified === 0)
                return next({ status: 404, message: "Could not update blog, with an id of: " + req.params.id });
            res.json(comment);
        });
    });
}
exports.create = create;
function update(req, res, next) {
    comment_model_1.Comment.update({ _id: req.params.id }, req.body, function (err, result) {
        if (err)
            return next(err);
        if (result.nModified === 0)
            return next({ status: 404, message: "Could not update comment, with an id of: " + req.params.id });
        res.json({ success: true });
    });
}
exports.update = update;
function remove(req, res, next) {
    comment_model_1.Comment.findOneAndRemove({ _id: req.params.id }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ status: 404, message: "Could not remove comment, with an id of: " + req.params.id });
        blog_model_1.Blog.update({ _id: result.Blog }, { $pull: { Comments: result._id } }, function (err, result) {
            if (err)
                return next(err);
            res.json({ success: true });
        });
    });
}
exports.remove = remove;
