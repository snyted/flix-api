import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import { getTrending } from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("movie"));

router.get("/", getTrending);

router.get("/search", getMediaByNameController);

router.get("/favorites", authenticate, getAllFavoritesMediasController);

router.get("/:id", getMediaByIdController);

router.patch("/:id/favorite", authenticate, toggleFavoriteMediaController);

router.patch("/:id/rate", authenticate, rateMediaController);

export default router;
