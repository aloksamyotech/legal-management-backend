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
  asyncHandler(adminController.adminRegistration)
);
router.get(
  "/getalluser",
  jwtMiddleware,
  asyncHandler(adminController.userFetch)
);
router.get("/getuserbyId/:id", asyncHandler(adminController.userFetchbyId));
router.delete("/deleteUser/:id", asyncHandler(adminController.deleteuserbyId));
router.put(
  "/updateUserpermission/:id",
  asyncHandler(adminController.permissionUpdate)
);
router.put(
  "/update/:id",
  upload.single("image"),
  asyncHandler(adminController.userUpdate)
);

export default router;
