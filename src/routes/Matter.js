import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { matterController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addMatter",
  jwtMiddleware,
  asyncHandler(matterController.MatterAdd),
);
router.get("/getMatter", asyncHandler(matterController.MatterFetch));
router.get(
  "/getAllMatter",
  jwtMiddleware,
  asyncHandler(matterController.GetAllmatter),
);
router.delete("/deleteMatter/:id", asyncHandler(matterController.MatterDelete));
router.put("/updateMatter/:id", asyncHandler(matterController.MatterUpdate));
export default router;
