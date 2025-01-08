import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { practiceareaController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addPracticearea",
  asyncHandler(practiceareaController.PracticeareaAdd),
);
router.get(
  "/getPracticearea",
  asyncHandler(practiceareaController.PracticeareaFetch),
);
router.get(
  "/getAllPracticearea",
  asyncHandler(practiceareaController.GetAllpracticearea),
);
router.delete(
  "/deletePracticearea/:id",
  asyncHandler(practiceareaController.PracticeareaDelete),
);
router.put(
  "/updatePracticearea/:id",
  asyncHandler(practiceareaController.PracticeareaUpdate),
);
export default router;
