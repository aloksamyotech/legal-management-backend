import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { contactController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addContact",
  upload.single("avatar"),
  jwtMiddleware,
  asyncHandler(contactController.ContactAdd),
);
router.get(
  "/getContact",
  jwtMiddleware,
  asyncHandler(contactController.ContactFetch),
);
router.get(
  "/getContactforpage",
  jwtMiddleware,
  asyncHandler(contactController.ContactforpageFetch),
);
router.delete(
  "/deleteContact/:id",
  asyncHandler(contactController.ContactDelete),
);
router.put(
  "/updateContact/:id",
  upload.single("avatar"),
  asyncHandler(contactController.ContactUpdate),
);
export default router;
