import {
  getAllFavorites,
  toggleFavorite,
  rateMedia,
  getMediaFromTmdb,
  trendingFromTmdb,
  FindOrCreateMedia,
} from "../services/mediasServices.js";
import { ApiError } from "../utils/ApiError.js";

import { validateMedia, validateRating } from "../utils/validators.js";

// ------ GETS -------
export async function getTrending(req, res) {
  const { mediaType } = req;
  try {
    const medias = await trendingFromTmdb(mediaType);
    res.json(medias);
  } catch (err) {
    next(err);
  }
}

// Get by Query Params
export async function searchingMedia(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Parâmetro 'q' é obrigatório" });
  }

  try {
    const movies = await getMediaFromTmdb(q);
    res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
}

export function showFavorites(req, res) {
  const favorites = getAllFavorites();
  // ARRUMAR ESSA FUNC DPS
  res.json(favorites);
}

// GET by ID
export async function findMediaById(req, res, next) {
  const { id } = req.params;
  const { mediaType } = req;
  try {
    const media = await FindOrCreateMedia(id, mediaType);
    validateMedia(media);
    res.status(200).json(media);
  } catch (err) {
    next(err);
  }
}

// ------- PUT's -------
// Put Toggle Favorite
export async function toggleFavoriteController(req, res, next) {
  const { id: mediaId } = req.params;
  const { id: userId } = req.user;
  const { mediaType } = req;

  if (!mediaId || !mediaType) {
    throw new ApiError(400, "ID ou tipo não informados.");
  }

  try {
    const result = await toggleFavorite(userId, mediaId, mediaType);
    return res
      .status(result.favorited ? 201 : 200)
      .json({
        message: result.favorited
          ? "Filme/Serie favoritado com sucesso!"
          : "Filme/Serie removido dos favoritos",
        ...result,
      });
  } catch (err) {
    next(err);
  }
}

// PUT  modify rate
export function rateMediaController(req, res) {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const media = findMediaById(id);
    validateMedia(media);
    validateRating(rating);
    const updatedMovie = rateMedia(movie, rating);
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
