import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { courtController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post("/addCourt", jwtMiddleware, asyncHandler(courtController.CourtAdd));
router.get("/getCourt", asyncHandler(courtController.CourtFetch));
router.get(
  "/getAllCourt",
  jwtMiddleware,
  asyncHandler(courtController.GetAllcourt),
);
router.get(
  "/getAllCourtpage",
  jwtMiddleware,
  asyncHandler(courtController.GetAllcourtpage),
);
router.delete("/deleteCourt/:id", asyncHandler(courtController.CourtDelete));
router.put("/updateCourt/:id", asyncHandler(courtController.CourtUpdate));
export default router;
