import { pool } from "../db/index.js";

export async function fetchAllMovies() {
  const movies = await pool.query("SELECT * FROM movies");
  return movies.rows;
}

export async function fetchMovieById(id) {
  const movieById = await pool.query("SELECT * from movies WHERE id = $1", [
    id,
  ]);
  return movieById.rows[0] || null;
}

export async function insertMovie(
  name,
  director_id,
  genre,
  release_date,
  rating
) {
  const newMovie = await pool.query(
    "INSERT INTO movies (name, director_id, genre, release_date, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [name, director_id, genre, release_date, rating]
  );
  return newMovie.rows[0];
}

export async function modifyMovieById(
  id,
  name,
  director_id,
  genre,
  release_date,
  rating
) {
  const modifiedMovie = await pool.query(
    "UPDATE movies SET name = $1, director_id = $2, genre = $3, release_date = $4, rating = $5 WHERE id = $6 RETURNING *",
    [name, director_id, genre, release_date, rating, id]
  );
  return modifiedMovie.rows[0] || null;
}

export async function removeMovieById(id) {
  const removedMovie = await pool.query(
    "DELETE FROM movies WHERE id = $1 RETURNING *",
    [id]
  );
  return removedMovie.rows[0] || null;
}
// CREATE EXPORT FUNCTIONS
