CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_id INT NOT NULL REFERENCES media(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 0 AND rating <= 5),
  UNIQUE(user_id, media_id)
);
