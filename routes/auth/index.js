import express from "express";
const router = express.Router();

import login from "./login.js";
import logout from "./logout.js";
import registerTerms from "./registerTerms.js";
import registerPhone from "./registerPhone.js";
import registerDetail from "./registerDetail.js";

router.use("/login", login);
router.use("/logout", logout);
router.use("/registerTerms", registerTerms);
router.use("/registerPhone", registerPhone);
router.use("/registerDetail", registerDetail);

export default router;
