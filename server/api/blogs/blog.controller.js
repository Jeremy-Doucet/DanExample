"use strict";
var blog_model_1 = require('./blog.model');
function getAll(req, res, next) {
    blog_model_1.Blog
        .find({})
        .exec(function (err, blogs) {
        if (err)
            return next(err);
        res.json(blogs);
    });
}
exports.getAll = getAll;
function getOne(req, res, next) {
    blog_model_1.Blog
        .findOne({ _id: req.params.id })
        .exec(function (err, blog) {
        if (err)
            return next(err);
        if (!blog)
            return next({ status: 404, message: "Could not find a blog with an id of: " + req.params.id });
        res.json(blog);
    });
}
exports.getOne = getOne;
function create(req, res, next) {
    var b = new blog_model_1.Blog(req.body);
    b.timePosted = Date.now();
    b.save(function (err, blog) {
        if (err)
            return next(err);
        res.json(blog);
    });
}
exports.create = create;
function update(req, res, next) {
    blog_model_1.Blog.update({ _id: req.params.id }, req.body, function (err, result) {
        if (err)
            return next(err);
        if (result.nModified === 0)
            return next({ status: 404, message: "Could not find a blog with an id of: " + req.params.id });
        if (result.nModified > 1)
            return next({ status: 500, message: 'Whoops.' });
        res.json(req.body);
    });
}
exports.update = update;
function remove(req, res, next) {
    blog_model_1.Blog.remove({ _id: req.params.id }, function (err) {
        if (err)
            return next(err);
        res.json({ success: true });
    });
}
exports.remove = remove;
