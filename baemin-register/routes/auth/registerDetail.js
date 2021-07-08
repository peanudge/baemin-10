import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
  res.render("auth/registerDetail", { title: "Register Phone" });
});

export default router;
