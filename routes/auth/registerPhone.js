import express from "express";

import checkRegex from '../../public/javascripts/utils/checkRegex.js'

const router = express.Router();

const SESSION_REGISTER_KEY = "registering";

router.get("/", function (req, res) {
  const registerSession = req.session[SESSION_REGISTER_KEY];
  if (!registerSession) {
    res.redirect("/auth/registerTerms");
    return;
  }
  res.render("auth/registerPhone");
});

router.post("/", function (req, res) {
  const { phone_number } = req.body;

  const isValid = checkRegex.phone(phone_number);

  if (isValid) {
    const processedPhoneNumber = phone_number.replace(/-/g, '');
    req.session[SESSION_REGISTER_KEY].phoneNumber = processedPhoneNumber;

    res.redirect("/auth/registerDetail");
  } else {
    res.render("auth/registerPhone");
  }
});

export default router;
