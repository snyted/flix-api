import { Router } from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  getAllFavoritesMoviesController,
  toggleFavoriteMovieController,
  rateMovieController
} from "../controllers/moviesController.js";

const router = Router();

router.get("/", getAllMoviesController);

router.get("/favorites", getAllFavoritesMoviesController);

router.get("/:id", getMovieByIdController);

router.patch('/:id/favorite', toggleFavoriteMovieController)

router.patch('/:id/rate', rateMovieController)

export default router;
