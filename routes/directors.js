import express from "express";

import {
  getDirectors,
  getDirectorById,
  createDirector,
  updateDirectorById,
  deleteDirectorById,
  getMovieByDirectorLastName,
} from "../controllers/directors.js";

const router = express.Router();

router.get("/filter", getMovieByDirectorLastName);
router.get("/", getDirectors);
router.get("/:id", getDirectorById);
router.post("/", createDirector);
router.patch("/:id", updateDirectorById);
router.delete("/:id", deleteDirectorById);

export default router;
