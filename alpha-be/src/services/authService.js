import { json } from "express";
import { userRepository } from "../repositories/userRepository.js";
import jwt from "jsonwebtoken";
import generateTokens from "../utils/generateTokens.js";
import { userService } from "../services/userService.js";
import passwordHandling from "../utils/passwordHandling.js";
import bcrypt from "bcrypt";

export const authService = {
  async register(data) {
    //storing them here for easiness
    const email = data.email;
    const password = data.password;
    const finalRegisterData = await passwordHandling(data);
    console.log("FINAL", finalRegisterData);
    const user = await userRepository.create(finalRegisterData);
    console.log("--------->", user);

    return this.login(email, password);
  },

  async login(email, password) {
    console.log("USER111", email, password);

    const user = await userRepository.getByEmail(email);
    console.log("USER", user);
    // user is not returning
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
    console.log("refresh token", rtoken);

    const updatedRT = await userService.update(user.id, rtoken);
    console.log(tokens, "...", updatedRT);
    return tokens;
  },

  async refreshAccessToken(refreshToken) {
    const user = await userRepository.getByRefreshToken(refreshToken);
    console.log("refresh access token USER", user);
    const userId = { id: user.id };
    console.log("refresh access token user id", userId);

    //verification
    const verification = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!verification)
      throw new Error("Oops! Looks like you are in the wrong place!");

    const accessToken = generateTokens.generateAccessToken(userId);
    return { accessToken: accessToken };
  },

  async logout(refreshToken) {
    const user = await userRepository.getByRefreshToken(refreshToken);
    const nullToken = { refreshToken: null };

    console.log("logout user", user);
    const logoutUser = await userRepository.update(user.id, nullToken);
    return logoutUser;
  },
};
