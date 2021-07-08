import express from "express";

import { compare } from "../../models/util/security.js";
import { AccountStore } from "../../app.js";

const router = express.Router();

const SESSION_AUTH_KEY = "auth";
const ID_NO_MATCH_MSG = "존재하지 않는 아이디입니다.";
const PASSWORD_NO_MATCH_MSG = "패스워드가 일치하지않습니다.";

router.get("/", function (req, res, next) {
  const accountInSession = req.session[SESSION_AUTH_KEY];
  if (accountInSession) {
    res.redirect("/");
  } else {
    res.render("auth/login", { title: "Login", id: "", errorMessage: "" });
  }
});

router.post("/", async function (req, res, next) {
  const { id, pw } = req.body;
  let errorMessage;
  const account = await AccountStore.retrieve(id);
  if (account) {
    const pwcheck = await compare(pw, account.password);
    if (pwcheck) {
      req.session[SESSION_AUTH_KEY] = account;
      res.redirect("/");
      return;
    } else {
      errorMessage = PASSWORD_NO_MATCH_MSG;
    }
  } else {
    errorMessage = ID_NO_MATCH_MSG;
  }

  res.render("auth/login", {
    title: "Login",
    errorMessage,
    id,
  });
});

export default router;
