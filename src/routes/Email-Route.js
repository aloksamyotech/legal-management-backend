import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { emailController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post("/toggleEmail", jwtMiddleware, asyncHandler(emailController.toggleEmail));
router.get("/getBlockedEmail", jwtMiddleware,asyncHandler(emailController.BlockedRoleFetch));
export default router;