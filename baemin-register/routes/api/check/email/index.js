import express from 'express';

const router = express.Router();

router.head('/', function (req, res) {
  const { email } = req.query;

  res.status(200).json({});
});

export default router;
