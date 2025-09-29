import { rest_model } from "../model/rest_model.js";
import {
  Encrypt_decrypt,
  checkvalidation,
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";
import Codes from "../../../../config/status_code.js";
import { validatorRules } from "../../auth/validation_rule.js";

export const addrestaurant = async (req, res) => {
  try {
    if (req.user.role !== "chef") {
      return sendApiResponse(res, 403, "Only chefs can add restaurants", null);
    }

    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));

    const valid = checkvalidation(decryptdata, validatorRules.newrestaurant);
    if (!valid || !valid.status) {
      return sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid?.error || "Validation failed",
        null
      );
    }

    // Add restaurant
    // Pass req.user to the model
    const newRestaurant = await rest_model.add(decryptdata, req.user);

    // Update user's restaurant_id
    req.user.restaurant_id = newRestaurant.restaurant_id;
    await req.user.save();

    return sendApiResponse(
      res,
      Codes.SUCCESS,
      "Restaurant added successfully",
      {
        id: newRestaurant.restaurant_id,
        name: newRestaurant.name,
        address: newRestaurant.address,
        phone_number: newRestaurant.phone_number,
        email: newRestaurant.email,
      }
    );
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};
