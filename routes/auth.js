import express from "express";
import { compare } from "../models/util/security.js";
import { AccountStore } from "../app.js";
import { RegisterInfo } from "../models/register/RegisterInfo.js";

/**
 * This constant variable means key for accessing login account info.
 */
const SESSION_AUTH_KEY = "auth";

/**
 * This constant variable means key for accessing register(sign up) info.
 */
const SESSION_REGISTER_KEY = "registering";

const ID_NO_MATCH_MSG = "존재하지 않는 아이디입니다.";
const PASSWORD_NO_MATCH_MSG = "패스워드가 일치하지않습니다.";
const TERMS_EMPTY_MSG = "필수 약관동의를 모두 확인해주세요.";

const router = express.Router();

router.get("/login", function (req, res, next) {
  const accountInSession = req.session[SESSION_AUTH_KEY];
  if (accountInSession) {
    res.redirect("/");
  } else {
    res.render("auth/login", { title: "Login", id: "", errorMessage: "" });
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
  const registerInfo = req.session[SESSION_REGISTER_KEY];
  if (registerInfo) {
    // Clear previous register infomation.
    req.session[SESSION_REGISTER_KEY] = null;
  }

  const accountInSession = req.session[SESSION_AUTH_KEY];
  if (accountInSession) {
    res.redirect("/");
  } else {
    res.render("auth/registerTerms");
  }
});

router.post("/registerTerms", function (req, res, next) {
  const { terms_1, terms_2, terms_3, age } = req.body;

  if (terms_1 && terms_2 && terms_3 && age) {
    const registerInfo = new RegisterInfo();
    registerInfo.isAgreeTerms = true;
    req.session[SESSION_REGISTER_KEY] = registerInfo;

    res.redirect("/auth/registerPhone");
  } else {
    res.render("auth/registerTerms", { errorMessage: TERMS_EMPTY_MSG });
  }
});

router.get("/registerPhone", function (req, res, next) {
  res.render("auth/registerPhone", { title: "Register Phone" });
});

router.get("/registerDetail", function (req, res, next) {
  res.render("auth/registerDetail", { title: "Register Detail" });
});

export default router;
