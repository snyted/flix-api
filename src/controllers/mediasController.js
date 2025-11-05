import {
  findMediaById,
  getTrendingService,
  allFavorites,
  toggleFavorite,
  rateMedia,
  getMediaByNameService,
} from "../services/mediasServices.js";

import { validateMovie, validateRating } from "../utils/validators.js";

// GETs
export async function getTrending(req, res) {
  const { type } = req.params;
  try {
    const medias = await trendingFromTmdb(type);
    res.json(medias);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar filmes", error: err.message });
  }
}

export async function getMediaByNameController(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: "Parâmetro 'q' é obrigatório" });
  }

  try {
    const movies = await getMediaByNameService(q);
    res.status(200).json(movies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar filmes", error: err.message });
  }
}

export function getAllFavoritesMediasController(req, res) {
  const favorites = allFavorites();
  res.json(favorites);
}

// GET by ID
export async function getMediaByIdController(req, res) {
  const { id } = req.params;
  try {
    const media = await findMediaById(id);
    validateMovie(media);
    res.json(media);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// PATCH: toggle favorite
export function toggleFavoriteMediaController(req, res) {
  const { id } = req.params;
  try {
    const movie = findMovieById(id);
    validateMovie(movie);
    const updatedMovie = toggleFavorite(movie);
    res.json(updatedMovie);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// PATCH: rate movie
export function rateMediaController(req, res) {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const movie = findMediaById(id);
    validateMovie(movie);
    validateRating(rating);
    const updatedMovie = rateMedia(movie, rating);
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
