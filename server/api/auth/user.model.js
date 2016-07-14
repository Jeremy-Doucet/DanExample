"use strict";
var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var userSchema = new mongoose.Schema({
    username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
    password: String,
    salt: String,
    blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});
userSchema.methods.hashPassword = function (password, cb) {
    this.salt = crypto.randomBytes(16).toString('hex');
    crypto.pbkdf2(password, this.salt, 1000, 32, function (err, buff) {
        if (err)
            return cb(err);
        cb(null, buff.toString('hex'));
    });
};
userSchema.methods.createJWT = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username
    }, 'secret');
};
exports.User = mongoose.model('User', userSchema);
