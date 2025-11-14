import pool from "../config/db.js";

export async function findUserByName(name) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE name = $1", [
      name,
    ]);

    return result.rows[0] || null;
  } catch (err) {
    console.error("Erro ao buscar usuário por nome:", err);
    throw err;
  }
}

export async function createUser(name, hashedPassword) {
  try {
    await pool.query("INSERT INTO users (name, password) VALUES ($1, $2)", [
      name,
      hashedPassword,
    ]);
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    throw err;
  }
}
