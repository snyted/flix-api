export function findMovieById(id) {
  return seeds.find((movie) => movie.id === id);
}

export function getAllMovies() {
  return seeds;
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
