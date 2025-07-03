import express from "express";
import { merchantController } from "../controllers/merchantController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", merchantController.getAllMerchants);
router.get("/:id", merchantController.getMerchantById);
router.post("/", merchantController.createMerchant);
router.patch("/:id", merchantController.updateMerchant);
router.delete("/:id", merchantController.deleteMerchant);

export default router;
