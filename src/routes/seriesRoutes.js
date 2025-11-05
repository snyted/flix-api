import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import { findMediaById, getTrending } from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("tv"));

router.get("/", getTrending);
router.get("/:id", findMediaById);

export default router;
