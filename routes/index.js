import express from "express";

import api from "./api/index.js";
import auth from "./auth/index.js";

const router = express.Router();

const SESSION_AUTH_KEY = "auth";

router.use("/api", api);
router.use("/auth", auth);

router.get("/", function (req, res, next) {
  const isAuth = req.session.hasOwnProperty(SESSION_AUTH_KEY);
  const nickname = req.session[SESSION_AUTH_KEY]?.nickname;

  res.render("index", { isAuth, nickname });
});

export default router;
