import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { adminController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
import { upload } from "../utils/multerConfig.js";

const router = Router();

router.post("/login", asyncHandler(adminController.adminLogin));
router.post(
  "/register",
  upload.single("image"),
  jwtMiddleware,
  asyncHandler(adminController.adminRegistration),
);
router.get(
  "/getalluser",
  jwtMiddleware,
  asyncHandler(adminController.userFetch),
);
router.get(
  "/getalluserpage",
  jwtMiddleware,
  asyncHandler(adminController.userFetchpage),
);
router.get(
  "/getcompanyLogo",
  jwtMiddleware,
  asyncHandler(adminController.companylogo),
);
router.get("/getuserbyId/:id", asyncHandler(adminController.userFetchbyId));
router.delete("/deleteUser/:id", asyncHandler(adminController.deleteuserbyId));
router.put(
  "/updateUserpermission/:id",
  asyncHandler(adminController.permissionUpdate),
);
router.put(
  "/update/:id",
  upload.single("image"),
  asyncHandler(adminController.userUpdate),
);

router.put(
  "/resetpassword",
  jwtMiddleware,
  asyncHandler(adminController.resetpassword),
);
router.put(
  "/updatelogo",
  upload.single("image"),
  jwtMiddleware,
  asyncHandler(adminController.updateLogo),
);
export default router;
