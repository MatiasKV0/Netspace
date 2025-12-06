import express from "express";

import {
  getListResults,
  getSeries,
  getMovies,
  getNovedades,
  getDetails,
  getResults
} from "../controllers/moviesController.js";

const MoviesRouter = express.Router();

MoviesRouter.get("/", getListResults);
MoviesRouter.get("/series", getSeries);
MoviesRouter.get("/movies", getMovies);
MoviesRouter.get("/new", getNovedades); 
MoviesRouter.get("/detalles/:id", getDetails);
MoviesRouter.get("/busqueda", getResults);

export default MoviesRouter;
