import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { caseController } from "../controllers/controllers.js";
const router = Router();
router.post("/addCase", asyncHandler(caseController.CaseAdd));
router.get("/getCase", asyncHandler(caseController.CaseFetch));
router.delete("/deleteCase/:id", asyncHandler(caseController.CaseDelete));
router.put("/updateCase/:id", asyncHandler(caseController.CaseUpdate));
export default router;
