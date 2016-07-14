"use strict";
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/blogapp';
require('./api/blogs/blog.model');
require('./api/comments/comment.model');
require('./api/auth/user.model');
mongoose.connect(MONGO_URL, function (err) {
    console.log(err || "MONGO connected to " + MONGO_URL);
    if (err)
        process.exit(1);
});
app.use(require('body-parser')());
app.use('/lib', express.static('bower_components'));
app.use('/client', express.static('client'));
app.get('/', function (req, res, next) {
    res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});
app.use('/api/blogs', require('./api/blogs/blog.routes'));
app.use('/api/comments', require('./api/comments/comment.routes'));
app.use('/api/auth', require('./api/auth/auth.routes'));
app.get(/(api|client|lib)\/.+/, function (req, res, next) {
    next({ status: 404, message: "Could not find\nMethod: " + req.method + "\nPath: " + req.path });
});
app.get('/*', function (req, res, next) {
    res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});
if (process.env.NODE_ENV === 'development') {
    app.use(function (err, req, res, next) {
        console.log(err);
        res.status(err.status || 500).json(err);
    });
}
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({ message: err.message });
});
exports.server = app.listen(PORT, function () {
    console.log("Server is listening on http://localhost:" + PORT);
});
