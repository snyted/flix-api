import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";
import { mapTmdbData } from "../utils/mapTmdb.js";
import {
  deleteFavorite,
  findFavorite,
  findMediaOnDb,
  getAllUserFavorites,
  insertFavorite,
  insertMediaSnapshot,
} from "../repository/mediaRepo.js";
import {
  findRateById,
  updateRate,
  insertRate,
} from "../repository/ratingRepo.js";

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
    const { data } = await tmdbApi.get("/search/multi", {
      params: { query: name },
    });
    console.log(data);
    return data.results.map((media) => mapTmdbData(media, media.media_type));
  } catch (err) {
    throw new ApiError(err, "Erro ao buscar filmes");
  }
}

export async function FindOrCreateMedia(id, type) {
  const existing = await findMediaOnDb(id, type);
  if (existing) return existing;

  const tmdbMapped = await getMediaByIdFromTmdb(id, type);
  const saved = await insertMediaSnapshot(tmdbMapped);
  return saved;
}

export async function getAllFavorites(userId) {
  const favorites = await getAllUserFavorites(userId);

  if (!favorites) {
    throw new ApiError(400, "Usuário não favoritou nenhum livro ainda!");
  }
  return favorites;
}

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

export async function updateOrAddRate(userId, mediaId, type, rating) {
  const mediaIdNum = Number(mediaId);
  const media = await FindOrCreateMedia(mediaIdNum, type);
console.log(rating)
  if (!media) {
    throw new ApiError(401, "Filme/Serie não encontrado.");
  }

  const isRated = await findRateById(userId, media.id);

  if (!isRated) {
    const rateInserted = await insertRate(userId, media.id, rating);
    return rateInserted;
  }

  const updRate = await updateRate(userId, media.id, rating);

  return updRate;
}
