import { query } from "../db.js";
import updateHandling from "../utils/updateHandling.js";

export const userRepository = {
  async getAll() {
    const res = await query(
      `SELECT 
          usr.id AS id,
          usr.firstName,
          usr.lastName,
          usr.email,
          usr.password,
          usr.isActive,
          usr.createdAt,
          usr.updatedAt,
          merchant.id AS merchantId,
          usr.roleId
        FROM "user" usr
        INNER JOIN merchant ON usr.merchantId = merchant.id AND merchant.isActive = true
        WHERE usr.isActive = true
        ORDER BY usr.id;`
    );
    return res.rows;
  },
  //do the same for others
  async getByEmail(email) {
    const res = await query(
      `SELECT 
          usr.id AS id,
          usr.firstName,
          usr.lastName,
          usr.email,
          usr.password,
          usr.isActive,
          usr.createdAt,
          usr.updatedAt,
          merchant.id AS merchantId,
          usr.roleId 
        FROM "user" usr
        INNER JOIN merchant ON usr.merchantId = merchant.id AND merchant.isActive = true
        WHERE usr.email = $1 AND usr.isActive = true;`,
      [email]
    );
    return res.rows[0];
  },

  async getById(id) {
    const res = await query(
      `SELECT 
          usr.id AS id,
          usr.firstName,
          usr.lastName,
          usr.email,
          usr.password,
          usr.isActive,
          usr.createdAt,
          usr.updatedAt,
          merchant.id AS merchantId,
          usr.roleId  
        FROM "user" usr
        INNER JOIN merchant ON usr.merchantId = merchant.id AND merchant.isActive = true
        WHERE usr.id = $1 AND usr.isActive = true;`,
      [id]
    );
    return res.rows[0];
  },

  async create({ firstName, lastName, email, password, merchantId, roleId }) {
    const res = await query(
      `INSERT INTO "user" 
        (firstName, lastName, email, password, merchantId, roleId)
        VALUES ($1,$2,$3,$4, $5, $6)
        RETURNING *`,
      [firstName, lastName, email, password, merchantId, roleId]
    );
    return res.rows[0];
  },

  async update(id, fields) {
    const res = await query(
      `UPDATE "user" SET ${updateHandling.setQuery(
        fields
      )}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = $1 RETURNING *`,
      updateHandling.values(id, fields)
    );

    return res.rows[0];
  },

  // async delete(id) {
  //     await query(`DELETE FROM users WHERE id = $1`, [id]);
  //     return { deleted: true, id };
  // }

  async delete(id) {
    await query(
      `UPDATE "user" SET isActive = false WHERE id = $1 RETURNING *`,
      [id]
    );
    return { deleted: true, id };
  },

  async getByRefreshToken(refreshToken) {
    const res = await query(
      `SELECT * FROM "user" WHERE refreshToken = $1 AND isActive = true`,
      [refreshToken]
    );
    return res.rows[0];
  },

  async getByMerchantId(merchantId) {
    const res = await query(
      `SELECT * FROM "user" WHERE merchantId = $1 AND isActive = true`,
      [merchantId]
    );
    return res.rows[0];
  },
};
