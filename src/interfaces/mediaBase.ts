export interface MediaBase {
    id: number;
    title: string;
    type: string;
    overview: string;
    releaseDate: string;
    posterPath: string | null;
    backdropPath: string | null;
}