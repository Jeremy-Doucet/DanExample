import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export interface IUserModel extends IUser, mongoose.Document {
  hashPassword(password: string, callback: (err: any, hashedPassword: string) => any);
  createJWT(): string;
}

// TODO: sparse is not setting unique properly
let userSchema = new mongoose.Schema({
  username: { type: String, unique: true, sparse: true, lowercase: true, trim: true },
  password: String,
  salt: String,

  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

userSchema.methods.hashPassword = function(password, cb) {
  this.salt = crypto.randomBytes(16).toString('hex');
  crypto.pbkdf2(password, this.salt, 1000, 32, function(err, buff) {
    if (err) return cb(err);
    cb(null, buff.toString('hex'));
  });
}

// TODO: change JWT secret before publishing
userSchema.methods.createJWT = function() {
  return jwt.sign({
    _id: this._id,
    username: this.username
  }, 'secret');
}

export let User = mongoose.model<IUserModel>('User', userSchema);
