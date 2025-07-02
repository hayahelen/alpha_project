import {query} from '../db.js';

 

export const userRepository = {

    async getAll() {
        const res = await query(
        `SELECT * FROM "user" WHERE isActive = true ORDER BY id `,
        );
        return res.rows;
    },
    
    async getByEmail(email) {
        console.log("EMAIL QUERY", email)

        const res = await query(
        `SELECT * FROM "user" WHERE email = $1 and isActive = true`,
        [email]
        );
        return res.rows[0];
    },

    async getById(id) {
        const res = await query(
        `SELECT * FROM "user" WHERE id = $1 and isActive = true`,
        [id]
        );
        return res.rows[0];
    },

  
    async create({ firstName, lastName, email, password, refreshToken }) {
        const res = await query(
        `INSERT INTO "user" 
        (firstName, lastName, email, password, refreshToken)
        VALUES ($1,$2,$3,$4, $5)
        RETURNING *`,
        [firstName, lastName, email, password, refreshToken]
        );
        return res.rows[0];
    },

    async update(id, fields) {
        const fieldNames = Object.keys(fields); 
        const setQuery = fieldNames.map((field, index) => `${field} = $${index + 2}`).join(", ");
        const values = [id, ...fieldNames.map(field => fields[field])];
        console.log("THE QUERYYY",setQuery)
        const res = await query(
            `UPDATE "user" SET ${setQuery}, updatedAt = CURRENT_TIMESTAMP
            WHERE id = $1 RETURNING *`,
            values
        );

        return res.rows[0];
        },


    // async delete(id) {
    //     await query(`DELETE FROM users WHERE id = $1`, [id]);
    //     return { deleted: true, id };
    // }

    async delete(id) {
            await query(`UPDATE "user" SET isActive = false WHERE id = $1 RETURNING *`, [id]);
            return { deleted: true, id };
        },


    async getByRefreshToken(refreshToken) {
        console.log("QUERY DATA", refreshToken)
        const res = await query(
             `SELECT * FROM "user" WHERE refreshToken = $1 AND isActive = true`,
        [refreshToken]
        );
        return res.rows[0];
    }

//refreshtoken is usually hashed --> hashing


    };
