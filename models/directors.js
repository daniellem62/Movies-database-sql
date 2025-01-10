import { pool } from "../db/index.js";

export async function fetchAllDirectors() {
  const directors = await pool.query("SELECT * FROM directors");
  return directors.rows;
}

export async function fetchDirectorById(id) {
  const directorById = await pool.query(
    "SELECT * from directors WHERE id = $1",
    [id]
  );
  return directorById.rows[0] || null;
}

export async function insertDirector(first_name, last_name) {
  const newDirector = await pool.query(
    "INSERT INTO directors (first_name, last_name) VALUES($1, $2) RETURNING *",
    [first_name, last_name]
  );
  return newDirector.rows[0];
}

export async function modifyDirectorById(id, first_name, last_name) {
  const modifiedDirector = await pool.query(
    "UPDATE directors SET first_name = $1, last_name = $2 WHERE id = $3 RETURNING *",
    [first_name, last_name, id]
  );
  return modifiedDirector.rows[0] || null;
}

export async function removeDirectorById(id) {
  const removedDirector = await pool.query(
    "DELETE FROM directors WHERE id = $1 RETURNING *",
    [id]
  );
  return removedDirector.rows[0] || null;
}

export async function fetchMovieByDirectorLastName(last_name) {
  const movieByDirector = await pool.query("SELECT * FROM movies JOIN directors ON directors.id = movies.director_id WHERE directors.last_name = $1", [
    last_name
  ]);
  return movieByDirector.rows || null;
}

export async function fetchDirectorsHighestRevenueMovie(last_name) {
  const movie = await pool.query("SELECT name, revenue, first_name, last_name FROM movies JOIN directors ON directors.id = movies.director_id JOIN accolades ON accolades.movies_id = movies.id WHERE directors.last_name = $1 ORDER BY accolades.revenue DESC LIMIT 1", [
    last_name
  ]);
  return movie.rows || null;
}