import { rolesAndPermissionsService } from "../services/rolesAndPermissionsService.js";
import { roleService } from "../services/roleService.js";
import errorHandling from "../utils/errorHandling.js";

export const roleAndPermissionController = {
  getAllPermissionAssignments: errorHandling(async (req, res) => {
    const permissions =
      await rolesAndPermissionsService.getAllPermissionAssignments();
    res.json(permissions);
  }),

  getPermissionByRoleId: errorHandling(async (req, res) => {
    const permission = await rolesAndPermissionsService.getPermissionByRoleId(
      req.params.id
    );
    res.json(permission || {});
  }),

  createPermission: errorHandling(async (req, res) => {
    const permission = await rolesAndPermissionsService.createPermission(
      req.body
    );
    res.status(201).json(permission);
  }),

  updatePermission: errorHandling(async (req, res) => {
    const updatedP = await rolesAndPermissionsService.updatePermisssion(
      req.params.roleId,
      req.body.permissionId
    );
    res.json(updatedP);
  }),

  deletePermission: errorHandling(async (req, res) => {
    const result = await rolesAndPermissionsService.deletePermission(
      req.params.roleId
    );
    res.json(result);
  }),
};
