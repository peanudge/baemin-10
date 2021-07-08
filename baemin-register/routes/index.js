import express from "express";
var router = express.Router();

const SESSION_AUTH_KEY = "auth";

router.get("/", function (req, res, next) {
  const nickname = req.session[SESSION_AUTH_KEY]?.nickname;

  res.render("index", { nickname });
});

export default router;
