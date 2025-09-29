import express from "express";
import {
  enc,
  forgotPassword,
  login,
  logout,
  resetpassword,
  singup,
} from "../controller/authcontroller.js";
import { tokenverify } from "../../../../middleware/headervalidator.js";

const router = express.Router();

router.post("/encrypt", enc);
router.post("/singup", singup);
router.post("/login", login);
router.get("/logout", tokenverify, logout);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetpassword);

export default router;
