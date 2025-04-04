import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { caseStageController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addCaseStage",
  jwtMiddleware,
  asyncHandler(caseStageController.CaseStageAdd),
);
router.get("/getCaseStage", asyncHandler(caseStageController.CaseStageFetch));
router.get(
  "/getAllCaseStage",
  jwtMiddleware,
  asyncHandler(caseStageController.GetAllcaseStage),
);
router.get(
  "/getAllCaseStagepage",
  jwtMiddleware,
  asyncHandler(caseStageController.GetAllcaseStagepage),
);
router.delete(
  "/deleteCaseStage/:id",
  asyncHandler(caseStageController.CaseStageDelete),
);
router.put(
  "/updateCaseStage/:id",
  asyncHandler(caseStageController.CaseStageUpdate),
);
export default router;
