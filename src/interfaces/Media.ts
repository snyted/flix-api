export interface MediaBase {
    id: number;
    title: string;
    type: string;
    overview: string;
    releaseDate: string;
    posterPath: string | null;
    backdropPath: string | null;
}

export interface MediaMapped {
  tmdb_id: number;
  title: string;
  type: 'movie' | 'serie';
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  rate?: number | null;
  review?: string | null;
  favorited?: "Sim" | "Não";
}