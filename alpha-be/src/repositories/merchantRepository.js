import { query } from "../db.js";
import updateHandling from "../utils/updateHandling.js";

export const merchantRepository = {
  async getAllMerchants() {
    const res = await query(
      `SELECT * FROM merchant WHERE isActive = true ORDER BY id `
    );
    return res.rows;
  },

  async getMerchantById(id) {
    const res = await query(
      `SELECT * FROM merchant WHERE id = $1 and isActive = true`,
      [id]
    );
    return res.rows[0];
  },

  async createMerchant({ name }) {
    const res = await query(
      `INSERT INTO merchant (name) VALUES ($1)
        RETURNING *`,
      [name]
    );
    return res.rows[0];
  },

  async updateMerchant(id, fields) {
    const res = await query(
      `UPDATE merchant SET ${updateHandling.setQuery(
        fields
      )}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = $1 RETURNING *`,
      updateHandling.values(id, fields)
    );

    return res.rows[0];
  },

  async deleteMerchant(id) {
    await query(
      `UPDATE merchant SET isActive = false WHERE id = $1 RETURNING *`,
      [id]
    );
    return { deleted: true, id };
  },
};
