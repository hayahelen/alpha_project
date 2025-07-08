import express from "express";
import { roleController } from "../controllers/roleController.js";
import { roleAndPermissionController } from "../controllers/rolesAndPermissionsController.js";
import authenticateToken from "../middleware/authenticateToken.js";
import { rolesAndPermissionsRepository } from "../repositories/rolesAndPermissionsRepositories.js";
import { permissionsController } from "../controllers/permissionsController.js";

const router = express.Router();
//roles

router.get("/", roleController.getAllRoles);
router.get("/permissions", permissionsController.getAllPermissions);
router.get("/:id", roleController.getRoleById);
router.post("/", roleController.createRole);
router.patch("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

//permissions

export default router;
