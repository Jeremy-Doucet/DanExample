import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/blogapp';

require('./api/blogs/blog.model');
require('./api/comments/comment.model');
require('./api/auth/user.model');
mongoose.connect(MONGO_URL, (err) => {
  console.log(err || `MONGO connected to ${MONGO_URL}`);
  if (err) process.exit(1);
});

app.use(require('body-parser')());
app.use('/lib', express.static('bower_components'));
app.use('/client', express.static('client'));

app.get('/', (req, res, next) => {
	res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

app.use('/api/blogs', require('./api/blogs/blog.routes'));
app.use('/api/comments', require('./api/comments/comment.routes'));
app.use('/api/auth', require('./api/auth/auth.routes'));

app.get(/(api|client|lib)\/.+/, (req, res, next) => {
	next({ status: 404, message: `Could not find\nMethod: ${req.method}\nPath: ${req.path}` });
});

app.get('/*', (req, res, next) => {
	res.sendFile(path.normalize(__dirname + '/../client/index.html'));
});

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
