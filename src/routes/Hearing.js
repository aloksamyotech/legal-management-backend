import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { hearingController } from "../controllers/controllers.js";
const router = Router();
router.post("/addHearing", asyncHandler(hearingController.HearingAdd));
router.get("/getHearing/:id", asyncHandler(hearingController.HearingFetch));
router.delete(
  "/deleteHearing/:id",
  asyncHandler(hearingController.HearingDelete),
);
router.put("/updateHearing/:id", asyncHandler(hearingController.HearingUpdate));
router.get("/getallhearing", asyncHandler(hearingController.AllHearingFetch));
router.get(
  "/gethearingbycase/:caseId",
  asyncHandler(hearingController.HearingByCase),
);

export default router;
