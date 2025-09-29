import { usermodel } from "../model/usermodel.js";
import Codes from "../../../../config/status_code.js";
import headervalidator, {
  checkValidationRules,
  Encrypt_decrypt,
} from "../../../../middleware/headervalidator.js";
import { validatorRules } from "../../auth/validation_rule.js";

export const getProfile = async (req, res) => {
  try {
    // tokenverify middleware se req.user aa raha hai
    return usermodel.getprofile(req.user, res);
  } catch (error) {
    return headervalidator.sendApiResponse(
      res,
      Codes.ERROR,
      error.message,
      null
    );
  }
};

export const updateprofile = async (req, res) => {
  try {
    const updatedData = req.body;
    

    // ✅ validate input
    const valid = checkValidationRules(
      updatedData,
      validatorRules.profilevalidation
    );

    if (!valid.status) {
      return headervalidator.sendApiResponse(
        res,
        Codes.ERROR,
        valid.message || "Validation failed",
        null
      );
    }

    const result = await usermodel.saveOrUpdateAddress(req.user, updatedData);

    return headervalidator.sendApiResponse(
      res,
      Codes.SUCCESS,
      "Profile updated successfully",
      result
    );
  } catch (error) {
    return headervalidator.sendApiResponse(
      res,
      Codes.ERROR,
      error.message,
      null
    );
  }
};

export const saveAddress = async (req, res) => {
  try {
    const { data } = req.body;
    const decryptString = Encrypt_decrypt.decrypt(data);
    const decryptdata = JSON.parse(decryptString);

    // validate
    const valid = headervalidator.checkvalidation(
      decryptdata,
      validatorRules.updateAddressValidation
    );
    if (!valid.status) {
      return headervalidator.sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid.error,
        null
      );
    }

    return usermodel.saveOrUpdateAddress(req.user, decryptdata, res);
  } catch (error) {
    return headervalidator.sendApiResponse(
      res,
      Codes.ERROR,
      error.message,
      null
    );
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.addressId;

    // usermodel ke function ko call karo
    return usermodel.deleteAddress(addressId, req.user, res);
  } catch (error) {
    return headervalidator.sendApiResponse(
      res,
      Codes.ERROR,
      error.message,
      null
    );
  }
};

export const getaddress = async (req, res) => {
  try {
    // req.user comes from tokenverify middleware
    return usermodel.getAddresses(req.user, res);
  } catch (error) {
    return headervalidator.sendApiResponse(
      res,
      Codes.ERROR,
      error.message,
      null
    );
  }
};
