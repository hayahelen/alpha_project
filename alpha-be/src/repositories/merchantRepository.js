import { query } from "../db.js";

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

  async createMerchant({ merchantName }) {
    const res = await query(
      `INSERT INTO merchant (merchantName) VALUES ($1)
        RETURNING *`,
      [merchantName]
    );
    return res.rows[0];
  },

  async updateMerchant(id, fields) {
    const fieldNames = Object.keys(fields);
    const setQuery = fieldNames
      .map((field, index) => `${field} = $${index + 2}`)
      .join(", ");
    const values = [id, ...fieldNames.map((field) => fields[field])];

    const res = await query(
      `UPDATE merchant SET ${setQuery}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = $1 RETURNING *`,
      values
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
