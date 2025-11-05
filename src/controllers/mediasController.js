import {
  getMediaById,
  getAllFavorites,
  toggleFavorite,
  rateMedia,
  getMediaFromTmdb,
  trendingFromTmdb,
} from "../services/mediasServices.js";

import { validateMovie, validateRating } from "../utils/validators.js";

// ------ GETS -------

export async function getTrending(req, res) {
  const { type } = req;
  console.log(type);
  try {
    const medias = await trendingFromTmdb(type);
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
  res.json(favorites);
}

// GET by ID
export async function findMediaById(req, res) {
  const { id } = req.params;
  const { type } = req;
  try {
    const media = await getMediaById(type, id);
    
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
