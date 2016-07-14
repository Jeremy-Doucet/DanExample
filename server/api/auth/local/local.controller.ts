import * as express from 'express';
import { User } from '../user.model';

export function login(req: express.Request, res: express.Response, next: Function) {
  User
    .findOne({ username: req.body.username })
    .exec((err, result) => {
    if (err) return next(err);
    if (!result) return next({ status: 400, message: 'bad username/password combination' });
    result.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return next(err);
      if (!isMatch) return next({ status: 400, message: 'bad username/password combination' });
      res.json({ token: result.createJWT() });
    });
  });
}

export function register(req: express.Request, res: express.Response, next: Function) {
  let u = new User(req.body);
  u.hashPassword(req.body.password, (err, hash) => {
    if (err) return next(err);
    u.password = hash;
    u.save((err, result) => {
      if (err) return next(err);
      res.json({ token: u.createJWT() });
    });
  });
}
