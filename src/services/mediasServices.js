import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";
import pool from "../config/db.js";
import { mapTmdbData } from "../utils/mapTmdb.js";

export async function getMediaById(type, id) {
  try {
    const response = await tmdbApi.get(`/${type}/${id}`);
    console.log(response)
  } catch (error) {
    throw new ApiError(
      error.response?.status || 500,
      "Erro ao buscar filme ou série"
    );
  }
}

export async function trendingFromTmdb(type) {
  try {
    const { data } = await tmdbApi.get(`/trending/${type}/week`);
    const mapped = data.results.map((media) => mapTmdbData(media, type));
    return mapped
  } catch (err) {
    console.error("Erro ao buscar dados do TMDB:", err.message);
  }
}

export async function getMediaFromTmdb(name) {
  try {
    const response = await tmdbApi.get("/search/multi", {
      params: { query: name },
    });
    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title || movie.name,
      overview: movie.overview,
      type: movie.media_type,
      release: movie.release_date,
    }));
  } catch (error) {
    console.error(
      "Erro ao buscar filmes:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao buscar filmes");
  }
}

export async function FindOrCreateMedia(type, tmdbId) {
  const media = await pool.query(
    `SELECT * FROM media WHERE tmdb_id = $1 AND type = $2`,
    [tmdbId, type]
  );

  if (media.rowCount > 0) {
    return media.rows[0];
  }

  const rawData = await getMediaById(type, tmdbId);

  const mapped = mapTmdbToMedia(rawData, type);
}

export function getAllFavorites() {}

export async function toggleFavorite(id, media) {
  const isFavorited = "";
}

export function rateMedia(movie, rating) {
  movie.rating = rating;
  return movie;
}
