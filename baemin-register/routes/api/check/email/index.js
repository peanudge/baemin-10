import express from 'express';

import { AccountStore } from "../../../../app.js";

const STATUS_OK = 200;
const STATUS_CONFLICT = 409;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const router = express.Router();

router.head('/', async function (req, res) {
  try {
    const { email } = req.query;
  
    const isExists = await AccountStore.retrieve(email);
    
    if (isExists) {
      res.status(STATUS_CONFLICT).json({});
      return;
    }
  
    res.status(STATUS_OK).json({});
  } catch (err) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({});
  }
});

export default router;
