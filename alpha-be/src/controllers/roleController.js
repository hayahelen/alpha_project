import { roleService } from "../services/roleService.js";
import errorHandling from "../utils/errorHandling.js";

export const roleController = {
  getAllRoles: errorHandling(async (req, res) => {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  }),

  getRoleById: errorHandling(async (req, res) => {
    const role = await roleService.getRoleById(req.params.id);
    res.json(role || {});
  }),

  createRole: errorHandling(async (req, res) => {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  }),

  updateRole: errorHandling(async (req, res) => {
    const updatedRole = await roleService.updateRole(req.params.id, req.body);
    res.json(updatedRole);
  }),

  deleteRole: errorHandling(async (req, res) => {
    const result = await roleService.deleteRole(req.params.id);
    res.json(result);
  }),
};
