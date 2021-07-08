import express from "express";

import api from "./api/index.js";
import auth from "./auth/index.js";

import { SESSION_AUTH_KEY } from "./sessionKeys.js";

const router = express.Router();

router.use("/api", api);
router.use("/auth", auth);

router.get("/", function (req, res, next) {
  const isAuth = req.session.hasOwnProperty(SESSION_AUTH_KEY);
  const nickname = req.session[SESSION_AUTH_KEY]?.nickname;
  console.log(req.session[SESSION_AUTH_KEY]);
  res.render("index", { isAuth, nickname });
});

export default router;
