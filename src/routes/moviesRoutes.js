import { Router } from "express";

import {
  getAllMoviesController,
  getMovieByIdController,
  getAllFavoritesMoviesController,
  toggleFavoriteMovieController,
  rateMovieController,
} from "../controllers/moviesController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", getAllMoviesController);

router.get("/favorites", authenticate, getAllFavoritesMoviesController);

router.get("/:id", getMovieByIdController);

router.patch("/:id/favorite", authenticate, toggleFavoriteMovieController);

router.patch("/:id/rate", authenticate, rateMovieController);

export default router;
