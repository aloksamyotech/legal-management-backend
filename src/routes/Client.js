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
router.get("/getClient", asyncHandler(clientController.ClientFetch));
router.get("/getAllClient", asyncHandler(clientController.GetAllclient));
router.delete("/deleteClient", asyncHandler(clientController.ClientDelete));
router.put(
  "/updateClient",
  upload.single("image"),
  asyncHandler(clientController.ClientUpdate),
);
export default router;
