import { query } from "../db.js";
import updateHandling from "../utils/updateHandling.js";

export const rolesRepository = {
  async getAllRoles() {
    const res = await query(
      `SELECT * FROM role WHERE isActive = true ORDER BY id `
    );
    return res.rows;
  },

  async getRoleById(id) {
    const res = await query(
      `SELECT * FROM role WHERE id = $1 and isActive = true`,
      [id]
    );
    return res.rows[0];
  },

  async createRole({ name, merchantId }) {
    const res = await query(
      `INSERT INTO role (name, merchantId) VALUES ($1, $2)
        RETURNING *`,
      [name, merchantId]
    );
    return res.rows[0];
  },
  async updateRole(id, fields) {
    const res = await query(
      `UPDATE role SET ${updateHandling.setQuery(
        fields
      )}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = $1 RETURNING *`,
      updateHandling.values(id, fields)
    );

    return res.rows[0];
  },

  async deleteRole(id) {
    await query(`UPDATE role SET isActive = false WHERE id = $1 RETURNING *`, [
      id,
    ]);
    return { deleted: true, id };
  },
  
};
