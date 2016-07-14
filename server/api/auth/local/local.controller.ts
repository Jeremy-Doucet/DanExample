import * as express from 'express';
import { User } from '../user.model';

export function login(req: express.Request, res: express.Response, next: Function) {

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
