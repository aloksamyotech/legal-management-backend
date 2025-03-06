import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { advocateController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addadvocate",
  upload.fields([
    { name: "certificate", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  jwtMiddleware,
  asyncHandler(advocateController.AdvocateAdd),
);
router.get(
  "/getAdvocateById/:id",
  asyncHandler(advocateController.AdvocateFetch),
);
router.get(
  "/getCasebyadvocateId/:advocateId",
  asyncHandler(advocateController.CaseByAdvocateId),
);
router.get("/getalladvocate", jwtMiddleware, asyncHandler(advocateController.GetAlladvocate));
router.delete(
  "/deleteadvocate/:id",
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
