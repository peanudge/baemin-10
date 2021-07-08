import express from 'express';

import account from './account/index.js';

const router = express.Router();

router.use('/account', account);

export default router;
