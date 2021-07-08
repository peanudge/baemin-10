import express from "express";
import { SESSION_REGISTER_KEY, SESSION_AUTH_KEY } from "../sessionKeys.js";
import { RegisterInfo } from "../../models/register/RegisterInfo.js";

const router = express.Router();

const TERMS_EMPTY_MSG = "필수 약관동의를 모두 확인해주세요.";

router.get("/", function (req, res) {
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

router.post("/", function (req, res) {
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

export default router;
