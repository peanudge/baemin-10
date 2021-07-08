import express from 'express';

import id from './id/index.js';

const router = express.Router();

router.use('/id', id);

export default router;
