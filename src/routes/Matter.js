import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { matterController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post("/addMatter", asyncHandler(matterController.MatterAdd));
router.get("/getMatter", asyncHandler(matterController.MatterFetch));
router.get("/getAllMatter", asyncHandler(matterController.GetAllmatter));
router.delete("/deleteMatter/:id", asyncHandler(matterController.MatterDelete));
router.put("/updateMatter/:id", asyncHandler(matterController.MatterUpdate));
export default router;
