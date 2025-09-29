import {
  checkvalidation,
  Encrypt_decrypt,
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";
import { validatorRules } from "../../auth/validation_rule.js";
import Codes from "../../../../config/status_code.js";
import cart_model from "../model/cart _model.js";

// 1️⃣ Add / Update item
export const addcart = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));

    const valid = checkvalidation(decryptdata, validatorRules.addToCart);
    if (!valid || !valid.status) {
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid?.error || "Validation failed",
        null
      );
    }

    const cartItem = await cart_model.addOrUpdateCart(decryptdata, req.user);
    return sendApiResponse(res, Codes.SUCCESS, "Cart item added", cartItem);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// 2️⃣ Remove item
export const removecart = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));

    const valid = checkvalidation(decryptdata, validatorRules.removeFromCart);
    if (!valid || !valid.status) {
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid?.error || "Validation failed",
        null
      );
    }

    const cartItem = await cart_model.removeFromCart(
      decryptdata.menu_id,
      req.user
    );
    return sendApiResponse(res, Codes.SUCCESS, "Cart item removed", cartItem);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// 3️⃣ Update item quantity
export const updatecart = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));

    const valid = checkvalidation(decryptdata, validatorRules.updateCartItem);
    if (!valid || !valid.status) {
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid?.error || "Validation failed",
        null
      );
    }

    const cartItem = await cart_model.updateCartItem(
      decryptdata.menu_id,
      decryptdata.quantity,
      req.user
    );
    return sendApiResponse(res, Codes.SUCCESS, "Cart item updated", cartItem);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// 4️⃣ Clear entire cart
export const clearcart = async (req, res) => {
  try {
    const cartItem = await cart_model.clearCart(req.user);
    return sendApiResponse(res, Codes.SUCCESS, "Cart cleared", cartItem);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
