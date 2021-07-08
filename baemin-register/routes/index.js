import express from "express";
var router = express.Router();

const SESSION_AUTH_KEY = "auth";

router.get("/", function (req, res, next) {
  const isAuth = req.session.hasOwnProperty(SESSION_AUTH_KEY);
  const nickname = req.session[SESSION_AUTH_KEY]?.nickname;

  res.render("index", { isAuth, nickname });
});

export default router;
