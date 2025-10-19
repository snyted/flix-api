import { Router } from "express";
import { validateUserFields } from "../middlewares/validateUserFields.js";
import { registerController, loginController } from "../controllers/authController.js";

const router = Router();

router.post("/register", validateUserFields, registerController);

router.post("/login", validateUserFields, loginController);

export default router;
