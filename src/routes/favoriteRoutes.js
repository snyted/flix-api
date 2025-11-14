import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { showFavorites } from "../controllers/mediasController.js";

const router = Router();

router.get("/", authenticate, showFavorites);

export default router;