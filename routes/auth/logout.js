import express from "express";

const router = express.Router();

import { SESSION_AUTH_KEY } from "../sessionKeys.js";

router.get("/", async function (req, res, next) {
  if (req.session[SESSION_AUTH_KEY]) {
    req.session.destroy();
  }
  res.redirect("/");
});

export default router;
