import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { policestationController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addPolicestation",
  jwtMiddleware,
  asyncHandler(policestationController.PolicestationAdd),
);
router.get(
  "/getPolicestation",
  asyncHandler(policestationController.PolicestationFetch),
);
router.get(
  "/getAllPolicestation",
  jwtMiddleware,
  asyncHandler(policestationController.GetAllpolicestation),
);
router.get(
  "/getAllPolicestationpage",
  jwtMiddleware,
  asyncHandler(policestationController.GetAllpolicestationpage),
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
