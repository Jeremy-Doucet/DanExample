import * as express from 'express';
import * as controller from './blog.controller';
const router = express.Router();

// GET: /api/blogs
router.get('/', controller.getAll);

// GET: /api/blogs/5
router.get('/:id', controller.getOne);

// POST: /api/blogs
router.post('/', controller.create);

// PUT: /api/blogs/5
router.put('/:id', controller.update);

// DELETE: /api/blogs/5
router.delete('/:id', controller.remove);

export = router;
