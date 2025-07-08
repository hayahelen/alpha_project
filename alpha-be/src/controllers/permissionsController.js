import { permissionsService } from "../services/permissionsService.js";
import errorHandling from "../utils/errorHandling.js";

export const permissionsController = {
  getAllPermissions: errorHandling(async (req, res) => {
    const roles = await permissionsService.getAllPermissions();
    res.json(roles);
  }),
};
