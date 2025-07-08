import express from "express";
import { userController } from "../controllers/userController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

// router.get("/", authenticateToken, userController.getAll);
// router.get("/email/:email",authenticateToken, userController.getByEmail);
// router.get("/:id",authenticateToken, userController.getById);
// router.post("/", authenticateToken, userController.createUser);
// router.patch("/:id", authenticateToken, userController.updateUser);
// router.delete("/:id", authenticateToken, userController.deleteUser);

router.get("/", userController.getAll);
router.get("/email/:email", userController.getByEmail);
router.get("/:id", userController.getById);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
//////////////////////////////////////////////////////
export default router;
