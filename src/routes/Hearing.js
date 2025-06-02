import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { hearingController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addHearing",
  jwtMiddleware,
  asyncHandler(hearingController.HearingAdd),
);
router.get("/getHearing/:id", asyncHandler(hearingController.HearingFetch));
router.delete(
  "/deleteHearing/:id",
  asyncHandler(hearingController.HearingDelete),
);
router.put("/updateHearing/:id", asyncHandler(hearingController.HearingUpdate));
router.get(
  "/getallhearing",
  jwtMiddleware,
  asyncHandler(hearingController.AllHearingFetch),
);
router.get(
  "/getallhearingforpage",
  jwtMiddleware,
  asyncHandler(hearingController.HearingFetchforpage),
);
router.get(
  "/gethearingbycase/:caseId",
  asyncHandler(hearingController.HearingByCase),
);

export default router;
