import express from "express";
import { compare } from "../models/util/security.js";
import { AccountStore } from "../app.js";

const SESSION_AUTH_KEY = "auth";

const ID_NO_MATCH_MSG = "존재하지 않는 아이디입니다.";
const PASSWORD_NO_MATCH_MSG = "패스워드가 일치하지않습니다.";

var router = express.Router();

router.get("/login", function (req, res, next) {
  const accountInSession = req.session[SESSION_AUTH_KEY];
  console.log("DEBUG - session ", req.session[SESSION_AUTH_KEY]);

  if (accountInSession) {
    res.redirect("/");
  } else {
    res.render("auth/login", { title: "Login", errorMessage: "", id: "" });
  }
});

router.post("/login", async function (req, res, next) {
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

router.get("/registerTerms", function (req, res, next) {
  res.render("auth/registerTerms", { title: "Register Terms" });
});

router.post("/registerTerms", function (req, res, next) {
  res.redirect("/auth/registerPhone");
});

router.get("/registerPhone", function (req, res, next) {
  res.render("auth/registerPhone", { title: "Register Phone" });
});

router.get("/registerDetail", function (req, res, next) {
  res.render("auth/registerDetail", { title: "Register Detail" });
});

export default router;
