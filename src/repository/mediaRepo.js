import pool from "../config/db.js";

export async function findMediaOnDb(id, type) {
  const result = await pool.query(
    `SELECT * FROM media WHERE tmdb_id = $1 AND type = $2 LIMIT 1`,
    [id, type]
  );
  return result.rows[0] || null;
}

export async function insertMediaSnapshot(media) {
  console.log(`Insert Media on TMDB: ${media}`);
  try {
    const result = await pool.query(
      `INSERT INTO media (tmdb_id, title, type, overview, poster_path, backdrop_path)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
      [
        media.tmdb_id,
        media.title,
        media.type,
        media.overview,
        media.poster_path,
        media.backdrop_path,
      ]
    );

    return result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      return null;
    }
    throw error;
  }
}

export async function insertFavorite(userId, mediaId) {
  const result = await pool.query(
    `INSERT INTO favorites (user_id, media_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, media_id) DO NOTHING
     RETURNING *`,
    [userId, mediaId]
  );
  return result.rows[0] || null;
}

export async function deleteFavorite(userId, mediaId) {
  await pool.query(
    `DELETE FROM favorites
     WHERE user_id = $1 AND media_id = $2`,
    [userId, mediaId]
  );
}

export async function findFavorite(userId, mediaId) {
  const result = await pool.query(
    `SELECT * FROM favorites
     WHERE user_id = $1 AND media_id = $2`,
    [userId, mediaId]
  );
  return result.rows[0] || null;
}

export async function getAllUserFavorites(userId) {
  const result = await pool.query(
    `SELECT 
  f.id as favorite_id,
  m.tmdb_id,
  m.title,
  m.overview,
  m.poster_path,
  m.backdrop_path,
  m.type
FROM favorites f
JOIN media m ON f.media_id = m.id
WHERE f.user_id = $1`,
    [userId]
  );

  return result.rows || null;
}
