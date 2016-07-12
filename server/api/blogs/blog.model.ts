import * as mongoose from 'mongoose';

export interface IBlogModel extends IBlog, mongoose.Document { }

let blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  timePosted: { type: Number, min: 16000 },
  postedBy: String,
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ]
});

export let Blog = mongoose.model<IBlogModel>('Blog', blogSchema);
