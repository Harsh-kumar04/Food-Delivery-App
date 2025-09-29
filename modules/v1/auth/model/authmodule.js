import db from "../../../../Database/models/index.js";
import common from "../../../../config/common.js";
import Codes from "../../../../config/status_code.js";
import en from "../../../../document/v1/languages/en.js";
import headervalidator, {
  sendApiResponse,
} from "../../../../middleware/headervalidator.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";

const User = db.User;

export const authmodel = {
  async signup(decryptData, res) {
    try {
      const isEmailExist = await User.findOne({
        where: { email: decryptData.email },
      });

      if (isEmailExist) {
        return sendApiResponse(
          res,
          Codes.VALIDATION_ERROR,
          en.rest_keywords_duplicate_email,
          null
        );
      }

      if (decryptData.password) {
        decryptData.password = await common.hashPassword(decryptData.password);
      }

      if (!decryptData.role) decryptData.role = "User";

      const user = await User.create(decryptData);

      return sendApiResponse(res, Codes.SUCCESS, en.rest_signup_added_success, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      return sendApiResponse(res, Codes.ERROR, error.message, null);
    }
  },

  async login(decryptData, res) {
    try {
      let user;

      if (decryptData.login_type === "n") {
        // Normal login
        user = await User.findOne({
          where: { email: decryptData.email },
        });

        if (!user) {
          return sendApiResponse(
            res,
            Codes.UNAUTHORIZED,
            en.rest_keywords_invalid_logindetails,
            null
          );
        }

        const isPassCorrect = await bcrypt.compare(
          decryptData.password,
          user.password
        );

        if (!isPassCorrect) {
          return sendApiResponse(
            res,
            Codes.UNAUTHORIZED,
            en.rest_keywords_invalid_logindetails,
            null
          );
        }
      } else {
        // Social login
        user = await User.findOne({
          where: {
            login_type: decryptData.login_type,
            social_id: decryptData.social_id,
          },
        });

        if (!user) {
          user = await User.create({
            name: decryptData.name || "New User",
            email: decryptData.email,
            login_type: decryptData.login_type,
            social_id: decryptData.social_id,
            is_verified: true,
            role: decryptData.role || "User",
          });
        }
      }

      // Common login steps
      const token = common.generateToken({
        email: user.email,
        id: user.id,
      });

      const finalToken =
        typeof token === "string" ? token : JSON.stringify(token);

      await User.update(
        {
          token: finalToken,
          login_status: true,
          last_login: new Date(),
        },
        { where: { id: user.id } }
      );

      return sendApiResponse(
        res,
        Codes.SUCCESS,
        en.rest_keywords_user_login_success,
        {
          token: finalToken,
          user: {
            id: user.id,
            login_type: user.login_type,
            user_name: user.name,
            email: user.email,
            role: user.role,
          },
        }
      );
    } catch (error) {
      return sendApiResponse(res, Codes.ERROR, error.message, null);
    }
  },

  async logout(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ where: { id: decoded.id, token } });
      if (!user) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      await User.update({ token: null }, { where: { id: user.id } });

      return res.json({ code: 200, message: "Logout successful" });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized", error: err.message });
    }
  },

  async forgotPassword(decryptData, res) {
    try {
      const user = await User.findOne({ where: { email: decryptData.email } });

      if (!user) {
        return headervalidator.sendApiResponse(
          res,
          Codes.BAD_REQUEST,
          "User not found",
          null
        );
      }

      const otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });

      const expiry = new Date(Date.now() + 5 * 60 * 1000);

      User.opt = otp;
      await user.update({ otp: otp }, { where: { email: user.email } });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_EMAIL,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_EMAIL,
        to: user.email,
        subject: "Password Reset OTP",
        text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
      });

      return headervalidator.sendApiResponse(
        res,
        Codes.SUCCESS,
        "Password reset email sent",
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

  async resetPassword(decryptData, res) {
    try {
      const { email, opt, new_password } = decryptData;

      // 1. Verify user exists
      const user = await User.findOne({ where: { email: email } });

      if (!user) {
        return headervalidator.sendApiResponse(
          res,
          Codes.NOT_FOUND,
          "Email not found",
          null
        );
      }

      // 2. Check OTP
      if (user.opt !== opt) {
        return headervalidator.sendApiResponse(
          res,
          Codes.BAD_REQUEST,
          "Invalid OTP provided or Expired",
          null
        );
      }

      // 4. Hash the new password
      const hashedPassword = await common.hashPassword(new_password);

      // 5. Save password & clear OTP fields
      await user.update({
        password: hashedPassword,
        otp: null,
      });

      return headervalidator.sendApiResponse(
        res,
        Codes.SUCCESS,
        "Password reset successful",
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
};
