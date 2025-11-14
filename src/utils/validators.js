import { ApiError } from "./ApiError.js";

export function validateMedia(media) {
  if (!media) throw new ApiError(404, "Filme/Série não encontrados!");
}

export function validateRating(rating) {
  if (typeof rating !== "number" || rating < 0 || rating > 5) {
    throw new Error("Rating inválido! Deve ser entre 0 e 5.");
  }
}
