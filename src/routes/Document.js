import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { documentController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addDocument",
  upload.array("Attachment", 5),
  asyncHandler(documentController.DocumentAdd),
);
router.get("/getAllDocument", asyncHandler(documentController.DocumentFetch));
router.get("/getDocument/:id", asyncHandler(documentController.DocumentById));
router.get("/getDocumentbycase/:caseId", asyncHandler(documentController.GetDocumentByCase));
router.put(
  "/updateDocument/:id",
  upload.array("Attachment", 5),
  asyncHandler(documentController.DocumentUpdate),
);
router.delete(
  "/deleteDocument/:id",
  asyncHandler(documentController.DocumentDelete),
);
export default router;
