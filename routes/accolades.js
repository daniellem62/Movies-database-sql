import express from "express";


import {
    getAwards,
    getAwardById,
    createAward,
    updateAwardById,
    deleteAwardById,
    getTop10Oscars,
    getTop10Baftas,
  } from "../controllers/accolades.js";


const router = express.Router();

//router.get("/filter", getMovieByRating);
router.get("/top10oscars", getTop10Oscars);
router.get("/top10baftas", getTop10Baftas);
router.get("/", getAwards);
router.get("/:id", getAwardById);
router.post("/", createAward);
router.patch("/:id", updateAwardById);
router.delete("/:id", deleteAwardById);


//router.get("/", );
//router.get("/:id", id);
//router.post("/", create);
//router.patch("/:id", updateById);
//router.delete("/:id", deleteById);

export default router;