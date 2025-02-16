import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { adviseController } from "../controllers/controllers.js";
const router = Router();
router.post("/addAdvise", asyncHandler(adviseController.AdviseAdd));
router.get("/getAdvise", asyncHandler(adviseController.AdviseFetch));
router.get(
  "/getoneAdvise/:id",
  asyncHandler(adviseController.SingleAdviceFetch),
);
router.delete("/deleteAdvise/:id", asyncHandler(adviseController.AdviseDelete));
router.put("/updateAdvise/:id", asyncHandler(adviseController.AdviseUpdate));
export default router;
