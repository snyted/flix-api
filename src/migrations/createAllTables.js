import pool from '../config/db.js';

async function createTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        movie_id INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
        UNIQUE(user_id, movie_id)
      );
    `);


    await pool.query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        movie_id INT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
        UNIQUE(user_id, movie_id)
      );
    `);
  } catch (err) {
    console.error('Erro ao criar tabelas:', err.message);
  } finally {
    pool.end();
  }
}

createTables();
