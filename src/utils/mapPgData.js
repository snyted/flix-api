export function mapPgData(raw) {
  return {
    tmdb_id: raw.id,
    title: raw.title,
    type: raw.type === "movie" ? raw.type : "serie",
    overview: raw.overview ?? null,
    rate: raw.rating || null,
    review: raw.content || null,
    favorited: raw.favorite ? "Sim" : "Não",
    poster_path: raw.poster_path ?? null,
    backdrop_path: raw.backdrop_path ?? null,
  };
}
