"use strict";
var user_model_1 = require('../user.model');
function login(req, res, next) {
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
