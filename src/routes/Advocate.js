import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { advocateController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addadvocate",
  upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  asyncHandler(advocateController.AdvocateAdd),
);
router.get("/getadvocate", asyncHandler(advocateController.AdvocateFetch));
router.get("/getalladvocate", asyncHandler(advocateController.GetAlladvocate));
router.delete(
  "/deleteadvocate",
  asyncHandler(advocateController.AdvocateDelete),
);
router.put(
  "/updateadvocate",
  upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  asyncHandler(advocateController.AdvocateUpdate),
);
export default router;
