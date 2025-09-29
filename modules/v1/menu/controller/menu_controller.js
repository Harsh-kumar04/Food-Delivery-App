import { validatorRules } from "../../auth/validation_rule.js";
import { menu_model } from "../models/menu_model.js";
import {
  Encrypt_decrypt,
  checkvalidation,
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";
import Codes from "../../../../config/status_code.js";

// ✅ Add Menu Item
export const addmenu = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));

    const valid = checkvalidation(
      decryptdata,
      validatorRules.addfoodvalidation
    );
    if (!valid || !valid.status) {
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid?.error || "Validation failed",
        null
      );
    }

    const menuItem = await menu_model.additem(decryptdata, req.user);

    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Menu item added successfully",
      menuItem
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// ✅ Get All Menu Items
export const getmenu = async (req, res) => {
  try {
    const { restaurant_id } = req.query; // optional filter
    const items = await menu_model.getitems(restaurant_id);

    return sendApiResponse(res, Codes.SUCCESS, "Menu items fetched", items);
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// ✅ Update Menu Item
export const updatemenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));

    const updatedItem = await menu_model.updateitem(id, decryptdata, req.user);

    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Menu item updated successfully",
      updatedItem
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

// ✅ Delete Menu Item
export const deletemenu = async (req, res) => {
  try {
    const { id } = req.params;
    await menu_model.deleteitem(id, req.user);

    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Menu item deleted successfully",
      null
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
