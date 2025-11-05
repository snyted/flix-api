import tmdbApi from "../config/tmdb.js";
import { ApiError } from "../utils/ApiError.js";

export async function getMediaById(type, id) {
  try {
    const response = await tmdbApi.get(`/${type}/${id}`);
    return response.data;
  } catch (error) {
    throw new ApiError(
      error.response?.status || 500,
      "Erro ao buscar filme ou série"
    );
  }
}

export async function trendingFromTmdb(type) {
  try {
    const response = await tmdbApi.get(`/trending/${type}/week`);
    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title || movie.name,
      overview: movie.overview,
      type: movie.media_type,
      release: movie.release_date,
    }));
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

export function getAllFavorites() {
  return seeds.filter((movie) => movie.favorite === true);
}

export function toggleFavorite(movie) {
  movie.favorite = !movie.favorite;
  return movie;
}

export function rateMedia(movie, rating) {
  movie.rating = rating;
  return movie;
}
