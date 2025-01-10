import { pool } from "../db/index.js";

export async function fetchAllMovies() {
  const movies = await pool.query("SELECT * FROM movies");
  console.log(movies)
  return movies.rows;
}


export async function fetchMovieById(id) {
  const movieById = await pool.query("SELECT * from movies WHERE id = $1", [
    id,
  ]);
  return movieById.rows[0] || null;
}

export async function insertMovie(
  id,
  name,
  genre,
  release_date,
  rating
) {
  const newMovie = await pool.query(
    "INSERT INTO movies (id, name, genre, release_date, rating) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [id, name, genre, release_date, rating]
  );
  return newMovie.rows[0];
}

export async function modifyMovieById(
  id,
  name,
  genre,
  release_date,
  rating
) {
  const modifiedMovie = await pool.query(
    "UPDATE movies SET name = $1, genre = $2, release_date = $3, rating = $4 WHERE id = $5 RETURNING *",
    [name, genre, release_date, rating, id]
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
export async function fetchMovieByRating(rating) {
  const movieByRating = await pool.query("SELECT * FROM movies WHERE rating >= $1 AND rating < ($1 + 1) ORDER BY rating DESC", [rating]);
  return movieByRating.rows || null;

}
// CREATE EXPORT FUNCTIONS


//export async function fetchMovieByGenre(genre) {
//    const movieByGenre = await pool.query("SELECT * FROM movies WHERE LOWER(genre) = LOWER($1)", [genre]);
//    console.log(movieByGenre.rows);
//    return movieByGenre.rows || null; } 



