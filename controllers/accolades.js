
import {
  fetchAllAwards,
  fetchAwardById,
  insertAward,
  modifyAwardById,
  removeAwardById,
} from "../models/accolades.js";

export async function getAwards(req, res) {
  try {
    const awards = await fetchAllAwards();
    res.status(200).json({ status: "success", data: awards });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}


export async function getAwardById(req, res) {
  try {
    const id = req.params.id;
    const award = await fetchAwardById(id);
    if (!award) {
      return res
        .status(404)
        .json({ status: "fail", message: "Award not found" });
    }
    res.status(200).json({ status: "success", data: award });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function createAward(req, res) {
  try {
    const { movie_id, oscars, baftas, revenue } = req.body;
    if (!movie_id || !oscars || !baftas || !revenue ) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const award = await insertAward(
      movie_id,
      oscars,
      baftas,
      revenue,
    );
    res.status(201).json({ status: "success", data: award });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function updateAwardById(req, res) {
  try {
    const id = req.params.id;
    const { movie_id, oscars, baftas, revenue } = req.body;
    if (!movie_id || !oscars || !baftas || !revenue) {
      return res
        .status(400)
        .json({ status: "fail", message: "Missing required fields" });
    }
    const award = await modifyAwardById(
      id,
      movie_id,
      oscars,
      baftas,
      revenue
    );
    if (!award) {
      return res
        .status(404)
        .json({ status: "fail", message: "Award not found" });
    }
    res.status(200).json({ status: "success", data: award });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function deleteAwardById(req, res) {
  try {
    const id = req.params.id;
    const award = await removeAwardById(id);
    if (!award) {
      return res
        .status(404)
        .json({ status: "fail", message: "Award not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}
