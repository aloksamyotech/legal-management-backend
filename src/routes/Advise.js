import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { adviseController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addAdvise",
  jwtMiddleware,
  asyncHandler(adviseController.AdviseAdd),
);
router.get(
  "/getAdvise",
  jwtMiddleware,
  asyncHandler(adviseController.AdviseFetch),
);
router.get(
  "/getoneAdvise/:id",
  asyncHandler(adviseController.SingleAdviceFetch),
);
router.delete("/deleteAdvise/:id", asyncHandler(adviseController.AdviseDelete));
router.put("/updateAdvise/:id", asyncHandler(adviseController.AdviseUpdate));
router.put(
  "/updateAdvisepayment",
  asyncHandler(adviseController.AdvisepaymentUpdate),
);
export default router;
