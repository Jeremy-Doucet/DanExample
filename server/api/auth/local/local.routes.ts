import * as express from 'express';
import * as controller from './local.controller';
const router = express.Router();

// POST: /api/auth/local/register
router.post('/register', controller.register);

export = router;
