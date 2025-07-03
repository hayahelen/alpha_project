import express from "express";
import { authController } from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/token", authController.refreshToken);
router.post("/login", authController.login);
router.delete("/logout", authController.logout);

export default router;
