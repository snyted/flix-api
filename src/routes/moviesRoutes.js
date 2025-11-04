import { Router } from "express";

import {
  getTrendingController,
  getMovieByIdController,
  getAllFavoritesMoviesController,
  toggleFavoriteMovieController,
  rateMovieController,
  getMovieByNameController
} from "../controllers/moviesController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.get("/", getTrendingController);

router.get('/search', getMovieByNameController)

router.get("/favorites", authenticate, getAllFavoritesMoviesController);

router.get("/:id", getMovieByIdController);

router.patch("/:id/favorite", authenticate, toggleFavoriteMovieController);

router.patch("/:id/rate", authenticate, rateMovieController);

export default router;
