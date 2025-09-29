import express from "express";
import { addrestaurant } from "../controller/rest_controller.js";
import { tokenverify } from "../../../../middleware/headervalidator.js";

const restrouter = express.Router();
restrouter.post("/addresturent", tokenverify, addrestaurant);

export default restrouter;
