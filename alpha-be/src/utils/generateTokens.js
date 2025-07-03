import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const generateTokens = {
  generateAccessToken: (userId) => {
    return jwt.sign(userId, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "10m",
    });
  },
  generateRefreshToken: (userId) => {
    return jwt.sign(userId, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
  },
};

export default generateTokens;
