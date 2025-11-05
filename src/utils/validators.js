export function validateMovie(media) {
  if (!media) throw new Error("Filme/Série não encontrados!");
}

export function validateRating(rating) {
  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    throw new Error("Rating inválido! Deve ser entre 0 e 5.");
  }
}
