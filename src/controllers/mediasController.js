import {
  getMediaById,
  getAllFavorites,
  toggleFavorite,
  rateMedia,
  getMediaFromTmdb,
  trendingFromTmdb,
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
    res
      .status(500)
      .json({ message: "Erro ao buscar filmes", error: err.message });
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
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar filmes", error: err.message });
  }
}

export function showFavorites(req, res) {
  const favorites = getAllFavorites();
  // ARRUMAR ESSA FUNC DPS
  res.json(favorites);
}

// GET by ID
export async function findMediaById(req, res) {
  const { id } = req.params;
  const { mediaType } = req;
  try {
    const media = await getMediaById(mediaType, id);

    validateMedia(media);
    res.json(media);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// ------- PUT's -------
// Put Toggle Favorite
export async function toggleFavoriteController(req, res, next) {
  const { id } = req.params;
  const { mediaType } = req;

  if (!id || !mediaType) {
    return next(new ApiError(400, "ID ou tipo não informados."));
  }

  try {
    const media = await getMediaById(mediaType, id);

    validateMedia(media);

    const result = await toggleFavorite(req.user.id, media);

    return res.status(201).json(result);
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
