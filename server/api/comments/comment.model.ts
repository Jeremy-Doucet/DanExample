import * as mongoose from 'mongoose';

export interface ICommentModel extends IComment, mongoose.Document { }

let commentSchema = new mongoose.Schema({
  text: String,
  timePosted: Number,
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
});

export let Comment = mongoose.model<ICommentModel>('Comment', commentSchema);
