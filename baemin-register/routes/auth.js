import express from "express";
import { AccountStore } from "../app.js";

var router = express.Router();

router.get("/login", function (req, res, next) {
  res.render("auth/login", { title: "Login" });
});

router.post("/login", async function (req, res, next) {
  // TODO: this is example. need to implement authentication.
  const { id, pw } = req.body;
  if (id) {
    const account = await AccountStore.retrieve(id);
    if (account.password === pw) {
      res.redirect("/");
    }
  }

  // TODO: Add Error Message
  res.render("auth/login", { title: "Login" });
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
