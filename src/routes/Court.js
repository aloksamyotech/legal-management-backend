import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { courtController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post("/addCourt", asyncHandler(courtController.CourtAdd));
router.get("/getCourt", asyncHandler(courtController.CourtFetch));
router.get("/getAllCourt", asyncHandler(courtController.GetAllcourt));
router.delete("/deleteCourt/:id", asyncHandler(courtController.CourtDelete));
router.put("/updateCourt/:id", asyncHandler(courtController.CourtUpdate));
export default router;
