interface IUser {
  username: String;
  password: String;
  salt: String;

  blogs: Array<IBlog|string>;
  comments: Array<IComment|string>;
}
