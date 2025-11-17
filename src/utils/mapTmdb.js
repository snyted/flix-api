export function mapTmdbData(raw, type) {
  return {
    tmdb_id: raw.id,
    title: raw.title || raw.name,
    type: type === 'movie' ? 'movie' : 'serie',
    overview: raw.overview ?? null,
    poster_path: raw.poster_path ?? null,
    backdrop_path: raw.backdrop_path ?? null,
  };
}
