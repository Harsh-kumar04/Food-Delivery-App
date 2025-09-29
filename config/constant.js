import dotenv from "dotenv";
dotenv.config();

export const GLOBALS = {
  KEY: process.env.KEY,
  IV: process.env.IV,
};
