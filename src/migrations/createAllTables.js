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
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        tmdb_id INTEGER UNIQUE,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(20) CHECK (type IN ('movie', 'series')),
        poster_path VARCHAR(255),
        overview TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        media_id INT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
        UNIQUE(user_id, media_id)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS ratings (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        media_id INT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
        rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
        UNIQUE(user_id, media_id)
      );
    `);

    console.log("✅ Tabelas criadas com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao criar tabelas:", err.message);
  } finally {
    pool.end();
  }
}

createTables();
