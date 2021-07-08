import express from 'express';

import { AccountStore } from "../../../../app.js";

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_INTERNAL_SERVER_ERROR = 500;

const router = express.Router();

router.head('/', async function (req, res) {
  try {
    const { id } = req.query;
  
    const isExists = await AccountStore.retrieve(id);
    
    if (isExists) {
      res.status(STATUS_OK).json({});
      return;
    }
  
    res.status(STATUS_NOT_FOUND).json({});
  } catch (err) {
    res.status(STATUS_INTERNAL_SERVER_ERROR).json({});
  }
});

export default router;
