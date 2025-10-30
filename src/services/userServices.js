import pool from "../config/db.js";
export async function getUserByNameService(name) {
    const query = `SELECT * FROM users WHERE name = $1`;
    const { rows } = await pool.query(query, [name]);
    return rows[0]; 
  }
  
