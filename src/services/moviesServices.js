import tmdbApi from "../config/tmdb.js";

export function findMovieById(id) {
  return seeds.find((movie) => movie.id === id);
}

export async function getTrendingService() {
  try {
    const response = await tmdbApi.get("/trending/all/week");
    return response.data.results;
  } catch (err) {
    console.error("Erro ao buscar dados do TMDB:", err.message);
  }
}

export function allFavorites() {
  return seeds.filter((movie) => movie.favorite === true);
}

export function toggleFavorite(movie) {
  movie.favorite = !movie.favorite;
  return movie;
}

export function rateMovie(movie, rating) {
  movie.rating = rating;
  return movie;
}
