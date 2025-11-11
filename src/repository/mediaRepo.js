import pool from "../config/db.js";

export async function findMediaOnDb(id, type) {
  const result = await pool.query(
    `SELECT * FROM media WHERE tmdb_id = $1 AND type = $2 LIMIT 1`,
    [id, type]
  );
  return result.rows[0] || null;
}

export async function insertMediaSnapshot({
  tmdb_id,
  type,
  title,
  poster_path,
  overview,
}) {
  const result = await pool.query(
    `INSERT INTO media (tmdb_id, type, title, poster_path, overview)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [tmdb_id, type, title, poster_path, overview]
  );

  return result.rows[0];
}
