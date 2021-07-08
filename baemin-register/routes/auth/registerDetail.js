import express from "express";

import { AccountStore } from "../../app.js";
import { hashpass } from "../../models/util/security.js";
import checkRegex from '../../public/javascripts/utils/checkRegex.js'

const router = express.Router();

const SESSION_REGISTER_KEY = "registering";

router.get("/", function (req, res) {
  const registerSession = req.session[SESSION_REGISTER_KEY];
  if (!registerSession) {
    res.redirect("/auth/registerTerms");
    return;
  }

  res.render("auth/registerDetail");
});

router.post("/", async function (req, res) {
  try {
    const { email, nickname, password, birthday } = req.body;
  
    const isEmailValid = checkRegex.email(email);
    const isPasswordValid = checkRegex.password(password);
    const isBirthdayValid = checkRegex.birthday(birthday);
    
    const isValid = isEmailValid &&
      isPasswordValid &&
      isBirthdayValid &&
      nickname;
  
    if (isValid) {
      const phoneNumber = req.session[SESSION_REGISTER_KEY]?.phoneNumber;
      const hashedPassword = await hashpass(password);
      const id = email;
  
      await AccountStore.create(
        id,
        hashedPassword,
        phoneNumber,
        nickname,
        birthday,
      );
  
      res.redirect("/");
    } else {
      res.render("auth/registerDetail");
    }
  } catch (err) {
    console.log(err);
    res.render("auth/registerDetail");
  }
});

export default router;
