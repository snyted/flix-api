import { v4 as uuidv4 } from "uuid";

export const seeds = [
  {
    id: uuidv4(),
    movie: "Interestelar",
    author: "Christopher Nolan",
    year: 2024,
    favorite: true,
    rating: null,
  },
  {
    id: uuidv4(),
    movie: "Outro Filme",
    author: "Nome do autor",
    year: 9999,
    favorite: true,
    rating: null,
  },
  {
    id: uuidv4(),
    movie: "Filme 3",
    author: "Autor 3",
    year: 2020,
    favorite: true,
    rating: null,
  },
];

console.log(`SEEDS: ${JSON.stringify(seeds)}`)