import Codes from "../../../../config/status_code.js";
import { validatorRules } from "../validation_rule.js";
import { authmodel } from "../model/authmodule.js";
import en from "../../../../document/v1/languages/en.js";

// Missing imports added
import headervalidator, {
  Encrypt_decrypt,
  checkvalidation,
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";

export const enc = async (req, res) => {
  try {
    const data = req.body;
    const stringData = JSON.stringify(data);

    const encryptedData = Encrypt_decrypt.encrypt(stringData);

    res.status(Codes.SUCCESS).json({
      message: "FULL OBJECT ENCRYPTED",
      data: encryptedData,
    });
  } catch (err) {
    res
      .status(Codes.INTERNAL_ERROR)
      .json({ message: en.data_not_found_for_decryption, err });
  }
};

export const singup = (req, res) => {
  try {
    const { data } = req.body;
    const decryptdata = JSON.parse(Encrypt_decrypt.decrypt(data));
    console.log(decryptdata);

    const valid = checkvalidation(decryptdata, validatorRules.signupValidation);
    console.log(valid);

    if (valid.status) {
      return authmodel.signup(decryptdata, res);
    } else {
      return sendApiResponse(res, Codes.VALIDATION_ERROR, valid.error, null);
    }
  } catch (error) {
    return sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

export const login = (req, res) => {
  try {
    const { data } = req.body; // encrypted data aa raha hamesha
    console.log(data);
    // Decrypt & Parse
    const decryptString = Encrypt_decrypt.decrypt(data);
    const decryptdata = JSON.parse(decryptString);

    // Validation
    const valid = headervalidator.checkvalidation(
      decryptdata,
      validatorRules.loginValidation
    );

    if (valid.status) {
      return authmodel.login(decryptdata, res);
    } else {
      return headervalidator.sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid.error
      );
    }
  } catch (error) {
    return headervalidator.sendApiResponse(res, Codes.ERROR, error.message);
  }
};
export const logout = (req, res) => {
  return authmodel.logout(req, res);
};

export const forgotPassword = (req, res) => {
  try {
    const { data } = req.body;
    const decryptString = Encrypt_decrypt.decrypt(data);
    const decryptdata = JSON.parse(decryptString);

    const valid = headervalidator.checkvalidation(
      decryptdata,
      validatorRules.forgotPasswordValidation
    ); //check email is propper
    console.log(valid);

    if (valid.status) {
      return authmodel.forgotPassword(decryptdata, res);
    } else {
      return headervalidator.sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid.error,
        null
      );
    }
  } catch (error) {
    return middleware.sendApiResponse(res, Codes.ERROR, error.message, null);
  }
};

export const resetpassword = (req, res) => {
  try {
    const decryptdata = req.body;

    // Validate
    const valid = headervalidator.checkvalidation(
      decryptdata,
      validatorRules.resetPasswordValidation
    );

    if (valid.status) {
      return authmodel.resetPassword(decryptdata, res);
    } else {
      return headervalidator.sendApiResponse(
        res,
        Codes.VALIDATION_ERROR,
        valid.error,
        null
      );
    }
  } catch (error) {
    return headervalidator.sendApiResponse(
      res,
      Codes.ERROR,
      error.message,
      null
    );
  }
};
