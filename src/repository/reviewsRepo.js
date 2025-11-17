import pool from "../config/db.js";

export async function findAllUserReviews(userId) {
  const result = await pool.query(
    `SELECT 
  content,
  m.*
FROM notes
JOIN media m ON notes.media_id = m.id
WHERE notes.user_id = $1`,
    [userId]
  );

  return result.rows;
}

export async function findReviewById(userId, id) {
  const result = await pool.query(
    `SELECT * FROM notes WHERE user_id = $1 AND media_id = $2`,
    [userId, id]
  );
  return result.rows[0];
}

export async function insertContent(userId, id, content) {
  const inserted = await pool.query(
    `INSERT INTO notes (user_id, media_id, content) VALUES ($1, $2, $3)`,
    [userId, id, content]
  );

  return inserted.rows[0];
}

export async function updateContent(userId, mediaId, content) {
  const result = await pool.query(
    `INSERT INTO notes (user_id, media_id, content)
     VALUES ($1, $2, $3)
     ON CONFLICT (user_id, media_id)
     DO UPDATE SET content = EXCLUDED.content
     RETURNING *`,
    [userId, mediaId, content]
  );

  return result.rows[0];
}