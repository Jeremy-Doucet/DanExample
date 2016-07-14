interface IBlog {
  _id: any;
  title: String;
  content: String;
  timePosted: Number;

  postedBy: string|IUser;
  comments: Array<string|IComment>;
}
