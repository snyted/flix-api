import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import {
  getTrending,
  findMediaById,
  toggleFavoriteController,
  putRate,
  putReview,
} from "../controllers/mediasController.js";

export const router = Router();

router.use(typingRoutes("movie"));

router.get("/", getTrending);
router.get("/:id", findMediaById);
router.post("/:id/favorite", authenticate, toggleFavoriteController);
router.put("/:id/rate", authenticate, putRate);
router.put("/:id/review", authenticate, putReview);

export default router;
