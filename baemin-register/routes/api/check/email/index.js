import express from 'express';

import { AccountStore } from "../../../../app.js";

const router = express.Router();

router.head('/', async function (req, res) {
  try {
    const { email } = req.query;
  
    const isExists = await AccountStore.retrieve(email);
    
    if (isExists) {
      res.status(409).json({});
      return;
    }
  
    res.status(200).json({});
  } catch (err) {
    res.status(500).json({});
  }
});

export default router;
