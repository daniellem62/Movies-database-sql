// import {
//  FUNCTIONS
//} from "../models/movies.js";
import {
  fetchAllMovies,
  fetchMovieById,
  fetchMovieByRating,
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

export async function getMovieByRating(req, res) {
    const { rating } = req.query;
    try {
      const movie = await fetchMovieByRating(rating);
      if (movie && movie.length > 0) {
        res.json({
          success: true,
          payload: movie,
        });
      } else {
        res.status(404).json({
          success: false,
          payload: "No movie found matching the given filter",
        });
      }
    } catch (error) {
      console.error("Error!", error);
      res.status(500).json({
        success: false,
        payload: "An error occurred while finding the movie"
      });
    }
  };


  

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
    const { id, name, genre, release_date, rating } = req.body;
    if (!id || !name || !genre || !release_date || !rating) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const movie = await insertMovie(
      id,
      name,
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
    const { name, genre, release_date, rating } = req.body;
    if (!name || !genre || !release_date || !rating) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const movie = await modifyMovieById(
      id,
      name,
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
