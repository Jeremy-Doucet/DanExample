import * as express from 'express';
import { Blog } from './blog.model';
import { Comment } from '../comments/comment.model';

export function getAll(req: express.Request, res: express.Response, next: Function) {
  Blog
    .find({ })
    .select('-postedBy')
    .populate('comments', 'text postedBy')
    .exec((err, blogs) => {
      if (err) return next(err);
      res.json(blogs);
    });
}

export function getOne(req: express.Request, res: express.Response, next: Function) {
  Blog
    .findOne({ _id: req.params.id })
    .exec((err, blog) => {
      if (err) return next(err);
      if (!blog) return next({ status: 404, message: `Could not find a blog with an id of: ${req.params.id}`});
      res.json(blog);
    });
}

export function create(req: express.Request, res: express.Response, next: Function) {
  let b = new Blog(req.body);
  b.timePosted = Date.now();
  b.save((err, blog) => {
    if (err) return next(err);
    res.json(blog);
  });
}

export function update(req: express.Request, res: express.Response, next: Function) {
  Blog.update({ _id: req.params.id }, req.body, (err, result: any) => {
    if (err) return next(err);
    if (result.nModified === 0) return next({ status: 404, message: `Could not find a blog with an id of: ${req.params.id}`});
    if (result.nModified > 1) return next({ status: 500, message: 'Whoops.' });
    res.json(req.body);
  });

  // Blog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, blog) => {});
}

export function remove(req: express.Request, res: express.Response, next: Function) {
  Blog.remove({ _id: req.params.id }, (err) => {
    if (err) return next(err);
    next();
  });
}

export function removeBlogComments(req: express.Request, res: express.Response, next: Function) {
  Comment.remove({ Blog: req.params.id }, (err) => {
    if (err) return next(err);
    res.json({ success: true });
  });
}
