import { query } from "../db.js";
import updateHandling from "../utils/updateHandling.js";

export const rolesAndPermissionsRepository = {
  async getAllPermissionAssignments() {
    const res = await query(
      `SELECT * FROM rolePermissionAssignment ORDER BY roleId `
    );
    return res.rows;
  },

  async getPermissionByRoleId(roleId) {
    const res = await query(
      `SELECT * FROM rolePermissionAssignment WHERE roleId = $1`,
      [roleId]
    );
    return res.rows;
  },

  async createPermission({ roleId, permissionId }) {
    await query("BEGIN");

    await query(
      `INSERT INTO rolePermissionAssignment (roleId, permissionId)
         SELECT $1, unnest($2::int[])
         ON CONFLICT (roleId, permissionId) DO NOTHING`,
      [roleId, permissionId]
    );
    const res = await this.getPermissionByRoleId(roleId);

    await query("COMMIT");

    return res;
  },

  async updatePermission(roleId, permissionId) {
    await query("BEGIN");

    await query(
      `DELETE FROM rolePermissionAssignment 
       WHERE roleId = $1 
       AND permissionId NOT IN (SELECT unnest($2::int[]))`,
      [roleId, permissionId]
    );
    const res = await this.createPermission({
      roleId,
      permissionId,
    });

    await query("COMMIT");
    return res;
  },

  //hard delete
  async deletePermission(roleId) {
    await query(`DELETE FROM rolePermissionAssignment WHERE roleId = $1`, [
      roleId,
    ]);
    return { deleted: true, roleId };
  },
};
