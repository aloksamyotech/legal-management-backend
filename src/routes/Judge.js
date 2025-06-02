import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { judgeController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post("/addJudge", jwtMiddleware, asyncHandler(judgeController.JudgeAdd));
router.get("/getJudge", asyncHandler(judgeController.JudgeFetch));
router.get(
  "/getAllJudge",
  jwtMiddleware,
  asyncHandler(judgeController.GetAlljudge),
);
router.get(
  "/getAllJudgepage",
  jwtMiddleware,
  asyncHandler(judgeController.GetAlljudgepage),
);
router.delete("/deleteJudge/:id", asyncHandler(judgeController.JudgeDelete));
router.put("/updateJudge/:id", asyncHandler(judgeController.JudgeUpdate));
export default router;
