import express from 'express';
import { authController } from '../controllers/authController.js';


const router = express.Router();


router.post("/token", authController.refreshToken);
router.post("/login/:email", authController.login);
router.delete('/logout', authController.logout);


export default router;