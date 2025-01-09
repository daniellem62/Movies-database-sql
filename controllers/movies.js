// import {
//  FUNCTIONS
//} from "../models/movies.js";
import {
  fetchAllMovies,
  fetchMovieById,
  insertMovie,
  modifyMovieById,
  removeMovieById,
} from "../models/movies.js";

export async function getMovies(req, res) {
  try {
    const movies = await fetchAllMovies();
    res.status(200).json({ status: "success", data: movies });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getMovieById(req, res) {
  try {
    const id = req.params.id;
    const movie = await fetchMovieById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ status: "fail", message: "Movie not found" });
    }
    res.status(200).json({ status: "success", data: movie });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createMovie(req, res) {
  try {
    const { name, director_id, genre, release_date, rating } = req.body;
    if (!name || !director_id || !genre || !release_date || !rating) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const movie = await insertMovie(
      name,
      director_id,
      genre,
      release_date,
      rating
    );
    res.status(201).json({ status: "success", data: movie });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateMovieById(req, res) {
  try {
    const id = req.params.id;
    const { name, director_id, genre, release_date, rating } = req.body;
    if (!name || !director_id || !genre || !release_date || !rating) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const movie = await modifyMovieById(
      id,
      name,
      director_id,
      genre,
      release_date,
      rating
    );
    if (!movie) {
      return res
        .status(404)
        .json({ status: "fail", message: "Movie not found" });
    }
    res.status(200).json({ status: "success", data: movie });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteMovieById(req, res) {
  try {
    const id = req.params.id;
    const movie = await removeMovieById(id);
    if (!movie) {
      return res
        .status(404)
        .json({ status: "fail", message: "Movie not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
