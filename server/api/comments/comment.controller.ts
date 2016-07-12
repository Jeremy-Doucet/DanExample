import * as express from 'express';
import { Comment } from './comment.model';
import { Blog } from '../blogs/blog.model';

export function create(req: express.Request, res: express.Response, next: Function) {
  let c = new Comment(req.body);
  c.blog = req.params.blogId;
  c.save((err, comment) => {
    if (err) return next(err);
    Blog.update({ _id: c.blog }, { $push: { comments: c._id }}, (err, result: any) => {
      if (err) return next(err);
      console.log(c);
      if (result.nModified === 0 ) return next({ status: 404, message: `Could not update blog, with an id of: ${req.params.blogId}`});
      res.json(comment);
    });
  });
}

export function update(req: express.Request, res: express.Response, next: Function) {
  Comment.update({ _id: req.params.id }, req.body, (err, result: any) => {
    if (err) return next(err);
    if (result.nModified === 0 ) return next({ status: 404, message: `Could not update comment, with an id of: ${req.params.id}`});
    res.json({ success: true });
  });
}

export function remove(req: express.Request, res: express.Response, next: Function) {
  Comment.findOneAndRemove({ _id: req.params.id }, (err, result) => {
    if (err) return next(err);
    if (!result) return next({ status: 404, message: `Could not remove comment, with an id of: ${req.params.id}`});
    Blog.update({ _id: result.blog }, { $pull: { comments: result._id }}, (err, result: any) => {
      if (err) return next(err);
      res.json({ success: true });
    });
  });
}
