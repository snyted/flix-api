import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";
import { mapTmdbData } from "../utils/mapTmdb.js";
import {
  deleteFavorite,
  findFavorite,
  findMediaOnDb,
  insertFavorite,
  insertMediaSnapshot,
} from "../repository/mediaRepo.js";

export async function getMediaByIdFromTmdb(id, type) {
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

  const tmdbMapped = await getMediaByIdFromTmdb(id, type);
  const saved = await insertMediaSnapshot(tmdbMapped);
  console.log(`SAVED: ${saved}`);
  return saved;
}

export function getAllFavorites() {}

export async function toggleFavorite(userId, mediaId, type) {
  const mediaIdNum = Number(mediaId);
  const media = await FindOrCreateMedia(mediaIdNum, type);

  const existing = await findFavorite(userId, media.id);

  if (existing) {
    await deleteFavorite(userId, media.id);
    return { favorited: false, media };
  }

  const inserted = await insertFavorite(userId, media.id);
  return { favorited: true, favorite: inserted, media };
}

export function rateMedia(movie, rating) {
  movie.rating = rating;
  return movie;
}
