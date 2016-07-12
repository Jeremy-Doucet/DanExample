import * as express from 'express';
import * as mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/blogapp';

require('./api/blogs/blog.model');
require('./api/comments/comment.model');
mongoose.connect(MONGO_URL, (err) => {
  console.log(err || `MONGO connected to ${MONGO_URL}`);
  if (err) process.exit(1);
});

app.use(require('body-parser')());

app.use('/api/blogs', require('./api/blogs/blog.routes'));
app.use('/api/comments', require('./api/comments/comment.routes'));

if (process.env.NODE_ENV === 'development') {
  app.use((err: any, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json(err);
  });
}

app.use((err: any, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

export let server = app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
