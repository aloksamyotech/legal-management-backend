import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { userController } from "../controllers/controllers.js";

router.post("/register", asyncHandler(userController.userRegistration));
router.post("/login", asyncHandler(userController.userLogin));

export default router;
