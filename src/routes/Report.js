import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { reportController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();

router.get(
  "/gethearingrepo",
  jwtMiddleware,
  asyncHandler(reportController.HearingRepoFetch),
);
router.get(
  "/getcaserepo",
  jwtMiddleware,
  asyncHandler(reportController.CaseRepoFetch),
);

export default router;
