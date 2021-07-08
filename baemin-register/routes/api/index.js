import express from 'express';

import check from './check/index.js';

const router = express.Router();

router.use('/check', check);

export default router;
