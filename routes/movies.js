//import express from "express";

//import {
//    functions
//  } from "../controllers/movies.js";

//const router = express.Router();

// router.get("/", );
//router.get("/:id", id);
//router.post("/", create);
//router.patch("/:id", updateById);
//router.delete("/:id", deleteById);

//export default router;

import express from "express";

import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
} from "../controllers/movies.js";

const router = express.Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.patch("/:id", updateMovieById);
router.delete("/:id", deleteMovieById);

export default router;
