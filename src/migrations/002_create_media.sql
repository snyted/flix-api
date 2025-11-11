CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  tmdb_id INTEGER UNIQUE,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(20) CHECK (type IN ('movie', 'tv')),
  overview TEXT
  poster_path VARCHAR(255),
  backdrop_path VARCHAR(255),
);
