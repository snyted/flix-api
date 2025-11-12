import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import { getTrending, findMediaById, toggleFavoriteController } from "../controllers/mediasController.js";

export const router = Router();

router.use(typingRoutes("movie"));

router.get("/", getTrending);
router.get("/:id", findMediaById);
router.post('/:id/favorite', authenticate, toggleFavoriteController)
//

// router.patch("/:id/rate", authenticate);

export default router;
