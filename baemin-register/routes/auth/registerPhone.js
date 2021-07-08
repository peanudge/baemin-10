import express from "express";

import { RegisterInfo } from "../../models/register/RegisterInFo.js";
import checkRegex from '../../public/javascripts/utils/checkRegex.js'

const router = express.Router();

const SESSION_REGISTER_KEY = "registering";

router.get("/", function (req, res) {
  const registerInfo = req.session[SESSION_REGISTER_KEY];
  if (registerInfo) {
    // Clear previous register infomation.
    req.session[SESSION_REGISTER_KEY] = null;
  }

  res.render("auth/registerPhone");
});

router.post("/", function (req, res) {
  const { phone_number } = req.body;

  const isValid = checkRegex.phone(phone_number);

  if (isValid) {
    const registerInfo = new RegisterInfo();
    registerInfo.phoneNumber = phone_number;
    req.session[SESSION_REGISTER_KEY] = registerInfo;

    res.redirect("/auth/registerDetail");
  } else {
    res.render("auth/registerPhone");
  }
});

export default router;
