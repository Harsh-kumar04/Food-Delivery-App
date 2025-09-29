import express from "express";
import { placeOrder, getOrders } from "../controller/order_controller.js";
import { tokenverify } from "../../../../middleware/headervalidator.js";

const orderRouter = express.Router();

orderRouter.post("/placeorder", tokenverify, placeOrder);
orderRouter.get("/", tokenverify, getOrders);

export default orderRouter;
