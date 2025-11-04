import {
  findMovieById,
  getTrendingService,
  allFavorites,
  toggleFavorite,
  rateMovie,
} from "../services/moviesServices.js";

import { validateMovie, validateRating } from "../utils/validators.js";

// GETs
export async function getTrendingController(req, res) {
  try {
    const movies = await getTrendingService();
    console.log(movies)
    res.json(movies);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro ao buscar filmes", error: err.message });
  }
}

export function getAllFavoritesMoviesController(req, res) {
  const favorites = allFavorites();
  res.json(favorites);
}

// GET by ID
export function getMovieByIdController(req, res) {
  const id = req.params.id;
  try {
    const movie = findMovieById(id);
    validateMovie(movie);
    res.json(movie);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

// PATCH: toggle favorite
export function toggleFavoriteMovieController(req, res) {
  const id = req.params.id;
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
export function rateMovieController(req, res) {
  const id = req.params.id;
  const { rating } = req.body;

  try {
    const movie = findMovieById(id);
    validateMovie(movie);
    validateRating(rating);
    const updatedMovie = rateMovie(movie, rating);
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
