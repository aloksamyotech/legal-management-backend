import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { judgeController } from "../controllers/controllers.js";
const router = Router();
router.post("/addJudge", asyncHandler(judgeController.JudgeAdd));
router.get("/getJudge", asyncHandler(judgeController.JudgeFetch));
router.get("/getAllJudge", asyncHandler(judgeController.GetAlljudge));
router.delete("/deleteJudge/:id", asyncHandler(judgeController.JudgeDelete));
router.put("/updateJudge/:id", asyncHandler(judgeController.JudgeUpdate));
export default router;
