import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const common = {
  async hashPassword(password) {
    try {
      const hashpassword = await bcrypt.hash(password, 10);
      return hashpassword;
    } catch (error) {
      return error;
    }
  },
  generateToken(payload) {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in environment variables");
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d", // ya apni marzi ka expiry
    });
  },
};
export default common;
