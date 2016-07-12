interface IBlog {
  _id: any;
  title: String;
  timePosted: Number;
  postedBy: String;

  Comments: Array<string|IComment>
}
