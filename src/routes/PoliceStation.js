import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { policestationController } from "../controllers/controllers.js";
const router = Router();
router.post(
  "/addPolicestation",
  asyncHandler(policestationController.PolicestationAdd),
);
router.get(
  "/getPolicestation",
  asyncHandler(policestationController.PolicestationFetch),
);
router.get(
  "/getAllPolicestation",
  asyncHandler(policestationController.GetAllpolicestation),
);
router.delete(
  "/deletePolicestation/:id",
  asyncHandler(policestationController.PolicestationDelete),
);
router.put(
  "/updatePolicestation/:id",
  asyncHandler(policestationController.PolicestationUpdate),
);
export default router;
