import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { practiceareaController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addPracticearea",
  jwtMiddleware,
  asyncHandler(practiceareaController.PracticeareaAdd),
);
router.get(
  "/getPracticearea",
  asyncHandler(practiceareaController.PracticeareaFetch),
);
router.get(
  "/getAllPracticearea",
  jwtMiddleware,
  asyncHandler(practiceareaController.GetAllpracticearea),
);
router.get(
  "/getAllPracticeareapage",
  jwtMiddleware,
  asyncHandler(practiceareaController.GetAllpracticeareapage),
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
