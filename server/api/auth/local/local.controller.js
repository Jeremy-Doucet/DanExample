"use strict";
var user_model_1 = require('../user.model');
function login(req, res, next) {
    user_model_1.User
        .findOne({ username: req.body.username })
        .exec(function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ status: 400, message: 'bad username/password combination' });
        result.comparePassword(req.body.password, function (err, isMatch) {
            if (err)
                return next(err);
            if (!isMatch)
                return next({ status: 400, message: 'bad username/password combination' });
            res.json({ token: result.createJWT() });
        });
    });
}
exports.login = login;
function register(req, res, next) {
    var u = new user_model_1.User(req.body);
    u.hashPassword(req.body.password, function (err, hash) {
        if (err)
            return next(err);
        u.password = hash;
        u.save(function (err, result) {
            if (err)
                return next(err);
            res.json({ token: u.createJWT() });
        });
    });
}
exports.register = register;
