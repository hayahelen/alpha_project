import { json } from "express";
import { userRepository } from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/generateTokens.js";
import { userService } from "../services/userService.js";
import bcrypt from "bcrypt";

export const authService = {
  async register(data) {
    //storing them here for easiness
    const email = data.email;
    const password = data.password;

    const hashed_password = await bcrypt.hash(data.password, 13);
    data.password = hashed_password;
    const user = await userRepository.create(data);

    return this.login(email, password);
  },

  async login(email, password) {
    const user = await userRepository.getByEmail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!user || !isValidPassword) {
      throw new Error("Invalid Credentials!");
    }

    const userId = { id: user.id };

    //link for the access token and the refresh token in utils
    const accessToken = generateTokens.generateAccessToken(userId);
    const refreshToken = generateTokens.generateRefreshToken(userId);

    const tokens = { accessToken: accessToken, refreshToken: refreshToken };
    const rtoken = { refreshToken: refreshToken };

    //sending to backend databse

    const updatedRT = await userService.update(user.id, rtoken);
    console.log(tokens, "...", updatedRT);
    return tokens;
  },

  async refreshAccessToken(refreshToken) {
    const user = await userRepository.getByRefreshToken(refreshToken);
    console.log("USER", user)
    const userId = { id: user.id };

    //verification
    const verification = await new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) reject(err);
          else resolve(user);
        }
      );
    });
    //here we create the access token (i have a question about this)

    const accessToken = generateTokens.generateAccessToken(userId);
    return { accessToken: accessToken };
  },

  async logout(refreshToken) {
    const user = await userRepository.getByRefreshToken(refreshToken);
    const nullToken = { refreshToken: null };
    const logout_user = await userRepository.update(user.id, nullToken);
    return logout_user;
  },
};
