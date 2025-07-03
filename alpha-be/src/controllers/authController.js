import { authService } from "../services/authService.js";
import env from "dotenv";
import errorHandling from "../utils/errorHandling.js";

env.config();

export const authController = {
  register: errorHandling(async (req, res) => {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  }),

  login: errorHandling(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await authService.login(email, password);
    res.json(user);
  }),

  refreshToken: errorHandling(async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const user = await authService.refreshAccessToken(refreshToken);

    if (refreshToken == null) return res.sendStatus(401);
    if (user == null) return res.sendStatus(403);
    res.json(user);
  }),

  logout: errorHandling(async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const user = await authService.logout(refreshToken);

    console.log("LOGGED OUT", user);
    res.sendStatus(204);
  }),
};
