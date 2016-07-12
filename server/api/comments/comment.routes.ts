import * as express from 'express';
import * as controller from './comment.controller';

const router = express.Router();

// POST: /api/comments/5
router.post('/:blogId', controller.create);
// PUT: /api/comments/5
router.put('/:id', controller.update);
// DELETE: /api/comments/5
router.delete('/:id', controller.remove);

export = router;
