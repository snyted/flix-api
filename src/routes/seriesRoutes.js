import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import {
  findMediaById,
  getTrending,
  toggleFavoriteController,
  putRate,
  putReview,
} from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("tv"));

router.get("/", getTrending);
router.get("/:id", findMediaById);
router.post("/:id/favorite", authenticate, toggleFavoriteController);
router.put("/:id/rate", authenticate, putRate);
router.put("/:id/review", authenticate, putReview);

export default router;
