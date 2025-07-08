import { permissionsRepository } from "../repositories/permissionsRepository.js";
import { rolesRepository } from "../repositories/rolesRepository.js";

export const roleService = {
  async getAllRoles() {
    return rolesRepository.getAllRoles();
  },

  async getRoleById(id) {
    return rolesRepository.getRoleById(id);
  },

  async createRole(data) {
    return rolesRepository.createRole(data);
  },

  async updateRole(id, fields) {
    return rolesRepository.updateRole(id, fields);
  },

  async deleteRole(id) {
    return rolesRepository.deleteRole(id);
  },

  //permissions only read
  async getAllPermissions() {
    return permissionsRepository.getAllPermissions();
  },
};
