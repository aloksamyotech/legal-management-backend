import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { caseController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post("/addCase", jwtMiddleware, asyncHandler(caseController.CaseAdd));
router.get("/getCase", jwtMiddleware, asyncHandler(caseController.CaseFetch));
router.get(
  "/getallCasepagination",
  jwtMiddleware,
  asyncHandler(caseController.CaseFetchforpage),
);
router.delete("/deleteCase/:id", asyncHandler(caseController.CaseDelete));
router.put("/updateCase/:id", asyncHandler(caseController.CaseUpdate));
router.get("/getCasebyid/:id", asyncHandler(caseController.GetCasebyId));
export default router;
