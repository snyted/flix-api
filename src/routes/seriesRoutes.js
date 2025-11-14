import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import {
  findMediaById,
  getTrending,
  toggleFavoriteController,
  postRating,
} from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("tv"));

router.get("/", getTrending);
router.get("/:id", findMediaById);
router.post("/:id/favorite", authenticate, toggleFavoriteController);
router.put("/:id/rating", authenticate, postRating);

export default router;
