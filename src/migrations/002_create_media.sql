CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,

 
  tmdb_id INTEGER NOT NULL,

  
  type VARCHAR(20) NOT NULL CHECK (type IN ('movie', 'tv')),

 
  title VARCHAR(255) NOT NULL,
  overview TEXT,
  poster_path VARCHAR(255),
  backdrop_path VARCHAR(255),

  
  created_at TIMESTAMP DEFAULT NOW(),

  
  UNIQUE (tmdb_id, type)
);
