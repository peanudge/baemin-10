import express from "express";

import { RegisterInfo } from "../../models/register/RegisterInFo.js";

const router = express.Router();

const SESSION_REGISTER_KEY = "registering";

router.get("/", function (req, res) {
  const registerInfo = req.session[SESSION_REGISTER_KEY];
  if (registerInfo) {
    // Clear previous register infomation.
    req.session[SESSION_REGISTER_KEY] = null;
  }

  res.render("auth/registerPhone", { title: "Register Phone" });
});

router.post("/", function (req, res) {
  const { phone_number } = req.body;

  if (phone_number) {
    const registerInfo = new RegisterInfo();
    registerInfo.phoneNumber = phone_number;
    req.session[SESSION_REGISTER_KEY] = registerInfo;

    res.redirect("/auth/registerDetail");
  }
});

export default router;
