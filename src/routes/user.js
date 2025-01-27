import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { adminController } from "../controllers/controllers.js";
router.post("/login", asyncHandler(adminController.adminLogin));
router.post("/register", asyncHandler(adminController.adminRegistration));

export default router;
