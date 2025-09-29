import express from "express";
import {
  addmenu,
  getmenu,
  updatemenu,
  deletemenu,
} from "../controller/menu_controller.js";
import { tokenverify } from "../../../../middleware/headervalidator.js";

const menurouter = express.Router();

// All routes require token verification
menurouter.post("/additem", tokenverify, addmenu);
menurouter.get("/items", tokenverify, getmenu);
menurouter.put("/update/:id", tokenverify, updatemenu);
menurouter.delete("/delete/:id", tokenverify, deletemenu);

export default menurouter;
