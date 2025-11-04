import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    language: "pt-BR",
  },
  headers: {
    Authorization: `Bearer ${process.env.TMDB_ACESS_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export default tmdbApi;
