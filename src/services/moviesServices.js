import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";

export async function findMovieById(id) {
  console.log(id);
  try {
    const responseMovie = await tmdbApi.get(`/movie/${id}`);
    return responseMovie.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      try {
        const responseTv = await tmdbApi.get(`/tv/${id}`);
        return responseTv.data;
      } catch (error) {
        throw new ApiError(404, "Filme ou série não encontrada");
      }
    }
    throw new ApiError(
      error.response?.status || 500,
      "Erro ao buscar filme ou série"
    );
  }
}

export async function getTrendingService() {
  try {
    const response = await tmdbApi.get("/trending/all/week");
    return response.data.results;
  } catch (err) {
    console.error("Erro ao buscar dados do TMDB:", err.message);
  }
}

export async function getMovieByNameService(name) {
  try {
    console.log("Service movie name", name);
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
