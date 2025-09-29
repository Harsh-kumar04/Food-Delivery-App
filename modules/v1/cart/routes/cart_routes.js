import express from "express";
import {
  addcart,
  removecart,
  updatecart,
  clearcart,
} from "../controller/cart_controller.js";
import { tokenverify } from "../../../../middleware/headervalidator.js";

const cartrouter = express.Router();

cartrouter.post("/add", tokenverify, addcart);

cartrouter.post("/remove", tokenverify, removecart);

cartrouter.post("/update", tokenverify, updatecart);

cartrouter.post("/clear", tokenverify, clearcart);

export default cartrouter;
