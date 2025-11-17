import pool from "../config/db.js";

export async function findAllUserRates(userId) {
  const result = await pool.query(
    `SELECT 
  rating,
  m.*
FROM ratings
JOIN media m ON ratings.media_id = m.id
WHERE ratings.user_id = $1`,
    [userId]
  );

  return result.rows;
}

export async function findRateById(userId, id) {
  const result = await pool.query(
    `SELECT * FROM ratings WHERE user_id = $1 AND media_id = $2`,
    [userId, id]
  );
  return result.rows[0];
}

export async function insertRate(userId, id, rating) {
  console.log(`userid, id, rating: ${userId}, ${id}, ${rating}`);
  const inserted = await pool.query(
    `INSERT INTO ratings (user_id, media_id, rating) VALUES ($1, $2, $3)`,
    [userId, id, rating]
  );

  return inserted.rows[0];
}

export async function updateRate(userId, mediaId, rating) {
  const result = await pool.query(
    `INSERT INTO ratings (user_id, media_id, rating)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, media_id)
     DO UPDATE SET rating = EXCLUDED.rating
     RETURNING *`,
    [userId, mediaId, rating]
  );

  return result.rows[0];
}
