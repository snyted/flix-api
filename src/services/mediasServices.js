import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";
import { mapTmdbData } from "../utils/mapTmdb.js";
import {
  deleteFavorite,
  findFavorite,
  findMediaOnDb,
  findAllUserFavorites,
  insertFavorite,
  insertMediaSnapshot,
} from "../repository/mediaRepo.js";
import {
  findAllUserRates,
  findRateById,
  updateRate,
  insertRate,
} from "../repository/ratingRepo.js";
import {
  findAllUserReviews,
  findReviewById,
  updateContent,
  insertContent,
} from "../repository/reviewsRepo.js";
import { mapPgData } from "../utils/mapPgData.js";

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

export async function findOrCreateMedia(id, type) {
  const existing = await findMediaOnDb(id, type);
  if (existing) return existing;

  const tmdbMapped = await getMediaByIdFromTmdb(id, type);
  const saved = await insertMediaSnapshot(tmdbMapped);
  return saved;
}

export async function getAllFavorites(userId) {
  const favorites = await findAllUserFavorites(userId);

  if (!favorites.length) {
    throw new ApiError(404, "Usuário não favoritou nenhum filme/serie ainda!");
  }
  return favorites;
}

export async function getAllRates(userId) {
  const rates = await findAllUserRates(userId);

  if (!rates.length) {
    throw new ApiError(404, "Usuário ainda não adicionou nenhuma nota.");
  }
  console.log(rates);
  const formated = rates.map((rawFromPg) =>
    mapPgData(rawFromPg, rawFromPg.type)
  );

  return formated;
}

export async function getAllReviews(userId) {
  const reviews = await findAllUserReviews(userId);

  if (!reviews.length) {
    throw new ApiError(404, "Usuário ainda não adicionou nenhuma review.");
  }
  const formated = reviews.map((rawFromPg) => mapPgData(rawFromPg));

  return formated;
}

export async function toggleFavorite(userId, mediaId, type) {
  const mediaIdNum = Number(mediaId);
  const media = await findOrCreateMedia(mediaIdNum, type);
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
  const media = await findOrCreateMedia(mediaIdNum, type);
  console.log(rating);
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

export async function updateOrAddReview(userId, mediaId, type, content) {
  const mediaIdNum = Number(mediaId);
  const media = await findOrCreateMedia(mediaIdNum, type);
  if (!media) {
    throw new ApiError(401, "Filme/Serie não encontrado.");
  }

  const isRated = await findRateById(userId, media.id)

  if(!isRated) {
    throw new ApiError(400, 'É necessário adicionar uma nota primeiro.')
  }

  const isReviewed = await findReviewById(userId, media.id);

  if (!isReviewed) {
    const contentInserted = await insertContent(userId, media.id, content);
    return { message: "Review criada!", data: contentInserted };
  }

  const updRate = await updateContent(userId, media.id, content);

  return { message: "Review atualizada", data: updRate };
}
