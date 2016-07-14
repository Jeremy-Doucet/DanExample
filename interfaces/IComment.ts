interface IComment {
  text: String;
  timePosted: Number;

  blog: string|IBlog;
  postedBy: string|IUser;
}
