import express from 'express';
import { userController } from '../controllers/userController.js';
import authenticateToken from '../middleware/authenticateToken.js';


const router = express.Router();

router.get("/", authenticateToken, userController.getAll);
router.get("/email/:email", userController.getByEmail);
router.get("/:id", userController.getById);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);


export default router;