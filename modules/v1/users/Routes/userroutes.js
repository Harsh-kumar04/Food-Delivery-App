import express from "express";
import { tokenverify } from "../../../../middleware/headervalidator.js";
import {
  deleteAddress,
  getaddress,
  getProfile,
  saveAddress,
  updateprofile,
} from "../controller/userscontroller.js";
const userrouter = express.Router();

userrouter.get("/profile", tokenverify, getProfile);
userrouter.put("/update-profile", tokenverify, updateprofile);
userrouter.put("/updateaddress", tokenverify, saveAddress);
userrouter.delete("/address/:addressId", tokenverify, deleteAddress);
userrouter.get("/address", tokenverify, getaddress);
export default userrouter;
