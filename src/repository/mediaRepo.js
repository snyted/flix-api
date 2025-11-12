import pool from "../config/db.js";

export async function findMediaOnDb(id, type) {
  const result = await pool.query(
    `SELECT * FROM media WHERE tmdb_id = $1 AND type = $2 LIMIT 1`,
    [id, type]
  );
  return result.rows[0] || null;
}

export async function insertMediaSnapshot(media) {
  console.log(`Insert Media on TMDB: ${media}`)
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
      console.log("Registro duplicado, ignorando...");
      return null;
    }
    throw error; // outros erros
  }
}
