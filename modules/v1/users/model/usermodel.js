import db from "../../../../Database/models/index.js";
import headervalidator, {
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";
import Codes from "../../../../config/status_code.js";
import { updateprofile } from "../controller/userscontroller.js";
import contains from "validator";

const User = db.User;
const Address = db.Address;

export const usermodel = {
  async getprofile(user, res) {
    try {
      // Sequelize query by user.id
      const profile = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ["password", "token"],
        },
      });

      if (!profile) {
        return headervalidator.sendApiResponse(
          res,
          Codes.NOT_FOUND,
          "User not found",
          null
        );
      }

      return headervalidator.sendApiResponse(
        res,
        Codes.SUCCESS,
        "Profile fetched successfully",
        profile
      );
    } catch (error) {
      return headervalidator.sendApiResponse(
        res,
        Codes.ERROR,
        error.message,
        null
      );
    }
  },

  async saveOrUpdateAddress(user, updatedData, res) {
    try {
      let address = await Address.findOne({
        where: { userId: user.id },
      });

      if (address) {
        // update existing address
        await address.update(updatedData);
      } else {
        // create new address linked with this user
        address = await Address.create({
          ...updatedData,
          userId: user.id,
        });
      }

      return headervalidator.sendApiResponse(
        res,
        Codes.SUCCESS,
        "Address saved successfully",
        address
      );
    } catch (error) {
      return headervalidator.sendApiResponse(
        res,
        Codes.ERROR,
        error.message,
        null
      );
    }
  },
  async deleteAddress(addressId, user, res) {
    try {
      const address = await Address.findOne({
        where: { id: addressId, userId: user.id },
      });

      if (!address) {
        return headervalidator.sendApiResponse(
          res,
          Codes.NOT_FOUND,
          "Address not found or not yours",
          null
        );
      }

      await address.destroy();

      return headervalidator.sendApiResponse(
        res,
        Codes.SUCCESS,
        "Address removed successfully",
        null
      );
    } catch (error) {
      return headervalidator.sendApiResponse(
        res,
        Codes.ERROR,
        error.message,
        null
      );
    }
  },

  async getAddresses(user, res) {
    try {
      // Fetch all addresses belonging to this user
      const addresses = await Address.findAll({
        where: { userId: user.id },
      });

      if (!addresses || addresses.length === 0) {
        return headervalidator.sendApiResponse(
          res,
          Codes.NOT_FOUND,
          "No addresses found for this user",
          null
        );
      }

      return headervalidator.sendApiResponse(
        res,
        Codes.SUCCESS,
        "Addresses fetched successfully",
        addresses
      );
    } catch (error) {
      return headervalidator.sendApiResponse(
        res,
        Codes.ERROR,
        error.message,
        null
      );
    }
  },
};
