import { Router } from "express";
import { searchingMedia } from "../controllers/mediasController.js";
const router = Router();

router.get("/", searchingMedia);

export default router;
