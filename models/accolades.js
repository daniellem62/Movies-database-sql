import { pool } from "../db/index.js";

// CREATE EXPORT FUNCTIONS WITH SQL
export async function fetchAllAwards() {
    const awards = await pool.query("SELECT * FROM accolades");
    return awards.rows;
  }
  

export async function fetchAwardById(id) {
  const awardsById = await pool.query("SELECT * from accolades WHERE id = $1", [
    id,
  ]);
  return awardsById.rows[0] || null;
}

export async function insertAward(
    movies_id,
    oscars,
    baftas,
    revenue,
  ) {
    const newAward = await pool.query(
      "INSERT INTO accolades (movies_id, oscars, baftas, revenue) VALUES($1, $2, $3, $4) RETURNING *",
      [movies_id, oscars, baftas, revenue]
    );
    return newAward.rows[0];
  }

export async function modifyAwardById(
    movies_id,
    oscars,
    baftas,
    revenue,
  ) {
    const modifiedAward = await pool.query(
      "UPDATE accolades SET movies_id = $1, oscars = $2, baftas = $3, revenue = $4, WHERE id = $5 RETURNING *",
      [movies_id, oscars, baftas, revenue, id]
    );
    return modifiedAward.rows[0] || null;
  }

export async function removeAwardById(id) {
  const removedAward = await pool.query(
    "DELETE FROM accolades WHERE id = $1 RETURNING *",
    [id]
   );
  return removedAward.rows[0] || null;
  }

export async function fetchTop10ByOscars() {
  const movieByOscars = await pool.query("SELECT * FROM movies JOIN accolades ON movies.id = accolades.movies_id ORDER BY oscars DESC LIMIT 10",);
  return movieByOscars.rows || null; }

  export async function fetchTop10ByBaftas() {
    const movieByBaftas = await pool.query("SELECT * FROM movies JOIN accolades ON movies.id = accolades.movies_id ORDER BY baftas DESC LIMIT 10",);
    return movieByBaftas.rows || null; }