import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { adminController } from "../controllers/controllers.js";
router.post("/adminlogin", asyncHandler(adminController.adminLogin));
router.post("/adminregister", asyncHandler(adminController.adminRegistration));

export default router;
