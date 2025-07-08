import { query } from "../db.js";

export const permissionsRepository = {
  async getAllPermissions() {
    const res = await query(`SELECT * FROM permission ORDER BY id `);
    return res.rows;
  },
};
