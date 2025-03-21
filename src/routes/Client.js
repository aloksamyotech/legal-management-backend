import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { clientController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addClient",
  upload.single("image"),
  jwtMiddleware,
  asyncHandler(clientController.ClientAdd),
);
router.get("/getClientbyid/:id", asyncHandler(clientController.ClientFetch));
router.get(
  "/getAllClient",
  jwtMiddleware,
  asyncHandler(clientController.GetAllclient),
);
router.get(
  "/getCaseByClient/:clientId",
  asyncHandler(clientController.GetCasebyClientId),
);
router.delete("/deleteClient/:id", asyncHandler(clientController.ClientDelete));
router.put(
  "/updateClient",
  upload.single("image"),
  asyncHandler(clientController.ClientUpdate),
);
router.post('/bulkUpload', upload.single('file'), asyncHandler(clientController.BulkuploadClient))
export default router;
