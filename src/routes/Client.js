import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { clientController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addClient",
  upload.single("image"),
  asyncHandler(clientController.ClientAdd),
);
router.get("/getClientbyid/:id", asyncHandler(clientController.ClientFetch));
router.get("/getAllClient", asyncHandler(clientController.GetAllclient));
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
export default router;
