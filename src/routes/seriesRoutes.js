import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { typingRoutes } from "../middlewares/typingRoutes.js";
import { getTrending } from "../controllers/mediasController.js";

const router = Router();

router.use(typingRoutes("tv"));

router.get("/", getTrending);
