import express from 'express';

import email from './email/index.js';

const router = express.Router();

router.use('/email', email);

export default router;
