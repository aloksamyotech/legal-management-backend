import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { caseStageController } from "../controllers/controllers.js";
const router = Router();
router.post("/addCaseStage", asyncHandler(caseStageController.CaseStageAdd));
router.get("/getCaseStage", asyncHandler(caseStageController.CaseStageFetch));
router.get(
  "/getAllCaseStage",
  asyncHandler(caseStageController.GetAllcaseStage),
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
