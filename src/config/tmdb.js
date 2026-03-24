import axios from "axios";

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "pt-BR",
  },
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});
console.log("Token do TMDB...:", process.env.TMDB_ACCESS_TOKEN);

export default tmdbApi;
