import * as express from 'express';
const router = express.Router();

// /api/auth/local => local.routes file
router.use('/local', require('./local/local.routes'));

export = router;
