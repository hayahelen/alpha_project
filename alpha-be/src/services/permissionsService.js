import { permissionsRepository } from "../repositories/permissionsRepository.js";

export const permissionsService = {
  async getAllPermissions() {
    return permissionsRepository.getAllPermissions();
  },
};
