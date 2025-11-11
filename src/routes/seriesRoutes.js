import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import {
  findMediaById,
  getTrending,
  toggleFavoriteController,
} from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("tv"));

router.get("/", getTrending);
router.get("/:id", findMediaById);
router.put("/:id/favorite", authenticate, toggleFavoriteController);

export default router;
