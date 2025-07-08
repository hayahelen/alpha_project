import { rolesAndPermissionsRepository } from "../repositories/rolesAndPermissionsRepositories.js";

export const rolesAndPermissionsService = {
  async getAllPermissionAssignments() {
    return rolesAndPermissionsRepository.getAllPermissionAssignments();
  },

  async getPermissionByRoleId(roleId) {
    return rolesAndPermissionsRepository.getPermissionByRoleId(roleId);
  },

  async createPermission(data) {
    return rolesAndPermissionsRepository.createPermission(data);
  },

  async updatePermisssion(roleId, permissionId) {
    return rolesAndPermissionsRepository.updatePermission(roleId, permissionId);
  },

  async deletePermission(roleId) {
    return rolesAndPermissionsRepository.deletePermission(roleId);
  },
};
