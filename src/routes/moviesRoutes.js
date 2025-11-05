import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import { getTrending, findMediaById } from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("movie"));

router.get("/", getTrending);
router.get("/:id", findMediaById);

// router.get("/favorites", authenticate);

// router.patch("/:id/favorite", authenticate);

// router.patch("/:id/rate", authenticate);

export default router;
