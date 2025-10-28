import { Pool } from "pg";

export const pool = new Pool({
  user: 'vitor',
  host: 'localhost',
  database: 'movies_db',
  password: 'senha123',
  port: 8080,
})