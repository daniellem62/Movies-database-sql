// import {
//  FUNCTIONS
//} from "../models/directors.js";

import {
  fetchAllDirectors,
  fetchDirectorById,
  insertDirector,
  modifyDirectorById,
  removeDirectorById,
  fetchMovieByDirectorLastName
} from "../models/directors.js";

export async function getDirectors(req, res) {
  try {
    const directors = await fetchAllDirectors();
    res.status(200).json({ status: "success", data: directors });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getDirectorById(req, res) {
  try {
    const id = req.params.id;
    const director = await fetchDirectorById(id);
    if (!director) {
      return res
        .status(404)
        .json({ status: "fail", message: "Director not found" });
    }
    res.status(200).json({ status: "success", data: director });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createDirector(req, res) {
  try {
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const director = await insertDirector(first_name, last_name);
    res.status(201).json({ status: "success", data: director });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateDirectorById(req, res) {
  try {
    const id = req.params.id;
    const { first_name, last_name } = req.body;
    if (!first_name || !last_name) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const director = await modifyDirectorById(id, first_name, last_name);
    if (!director) {
      return res
        .status(404)
        .json({ status: "fail", message: "Director not found" });
    }
    res.status(200).json({ status: "success", data: director });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteDirectorById(req, res) {
  try {
    const id = req.params.id;
    const director = await removeDirectorById(id);
    if (!director) {
      return res
        .status(404)
        .json({ status: "fail", message: "Director not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function getMovieByDirectorLastName(req, res) {
  const { lastname } = req.query;
  try {
    const movie = await fetchMovieByDirectorLastName(lastname);
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