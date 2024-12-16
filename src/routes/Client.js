import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { clientController } from "../controllers/controllers.js";
const router = Router();
router.post("/addClient", asyncHandler(clientController.ClientAdd));
router.get("/getClient", asyncHandler(clientController.ClientFetch));
router.delete("/deleteClient", asyncHandler(clientController.ClientDelete));
router.put("/updateClient", asyncHandler(clientController.ClientUpdate));
export default router;
