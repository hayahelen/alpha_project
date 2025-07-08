import express from "express";
import { roleController } from "../controllers/roleController.js";
import { roleAndPermissionController } from "../controllers/rolesAndPermissionsController.js";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();

router.get("/", roleAndPermissionController.getAllPermissionAssignments);
router.get("/:id", roleAndPermissionController.getPermissionByRoleId);
router.post("/", roleAndPermissionController.createPermission);
router.patch("/:roleId", roleAndPermissionController.updatePermission);
router.delete("/:id", roleAndPermissionController.deletePermission);

export default router;
