// headervalidator.js
import cryptLib from "cryptlib";
import dotenv from "dotenv";
import Validator from "validatorjs";
import jwt from "jsonwebtoken";
dotenv.config();

import db from "../Database/models/index.js";
const User = db.User;

export class Encrypt_decrypt {
  static shaKey;

  static encrypt(data, BITS = 32) {
    if (!Encrypt_decrypt.shaKey) {
      Encrypt_decrypt.shaKey = cryptLib.getHashSha256(process.env.KEY, BITS);
    }
    return cryptLib.encrypt(data, Encrypt_decrypt.shaKey, process.env.IV);
  }

  static decrypt(data, BITS = 32) {
    if (!Encrypt_decrypt.shaKey) {
      Encrypt_decrypt.shaKey = cryptLib.getHashSha256(process.env.KEY, BITS);
    }
    return cryptLib.decrypt(data, Encrypt_decrypt.shaKey, process.env.IV);
  }
}

export const checkvalidation = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    const errors = validation.errors.all();
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorKey][0];
    return { status: false, error: firstErrorMessage };
  }
  return { status: true };
};

export const sendApiResponse = (res, resCode, msgKey, resData) => {
  const responsejson = { code: resCode, message: msgKey };
  if (resData !== null) responsejson.data = resData;
  return res.status(resCode).json(responsejson);
};

export const checkValidationRules = (data, rules) => {
  const validation = new Validator(data, rules);
  if (validation.fails()) {
    const errors = validation.errors.all();
    const firstErrorKey = Object.keys(errors)[0];
    const firstErrorMessage = errors[firstErrorKey][0];
    return { status: false, error: firstErrorMessage };
  }
  return { status: true };
};

export const tokenverify = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("🔑 Token from header:", token);
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ fixed: using User not users
    const user = await User.findOne({ where: { id: decoded.id, token } });
    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized", error: err.message });
  }
};

export default { sendApiResponse, checkvalidation, tokenverify };
