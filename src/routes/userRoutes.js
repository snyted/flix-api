import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  showFavorites,
  showRates,
  showReviews,
} from "../controllers/mediasController.js";

const router = Router();
router.get("/", authenticate);
router.get("/favorites", authenticate, showFavorites);
router.get("/rates", authenticate, showRates);
router.get("/reviews", authenticate, showReviews);

export default router;
