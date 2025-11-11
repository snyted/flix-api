import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";
import { mapTmdbData } from "../utils/mapTmdb.js";
import { findMediaOnDb, insertMediaSnapshot } from "../repository/mediaRepo.js";

export async function getMediaById(id, type) {
  try {
    const { data } = await tmdbApi.get(`/${type}/${id}`);
    return mapTmdbData(data, type);
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
    return data.results.map((media) => mapTmdbData(media, type));
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

export async function FindOrCreateMedia(id, type) {
  const existing = await findMediaOnDb(id, type);

  if (existing) return existing;
  const tmdbRaw = await getMediaById(id, type);
  if (!tmdbRaw) throw new ApiError(404, "Não encontrado na TMDB");

  const mapped = mapTmdbData(tmdbRaw, type);

  const saved = await insertMediaSnapshot(mapped);

  return saved;
}

export function getAllFavorites() {}

export async function toggleFavorite(id, media) {
  const isFavorited = "";
}

export function rateMedia(movie, rating) {
  movie.rating = rating;
  return movie;
}
