import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { contactController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addContact",
  upload.single("avatar"),
  asyncHandler(contactController.ContactAdd),
);
router.get("/getContact", asyncHandler(contactController.ContactFetch));
router.delete("/deleteContact", asyncHandler(contactController.ContactDelete));
router.put(
  "/updateContact",
  upload.single("avatar"),
  asyncHandler(contactController.ContactUpdate),
);
export default router;
