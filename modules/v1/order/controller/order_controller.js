import {
  checkvalidation,
  Encrypt_decrypt,
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";
import Codes from "../../../../config/status_code.js";
import order_model from "../models/order_model.js";

// 1️⃣ Place order
export const placeOrder = async (req, res) => {
  try {
    const order = await order_model.createOrder(req.user);
    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Order placed successfully",
      order
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// 2️⃣ Get all user orders
export const getOrders = async (req, res) => {
  try {
    const orders = await order_model.getUserOrders(req.user);
    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Orders fetched successfully",
      orders
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
