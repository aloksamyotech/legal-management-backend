import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { evidenceController } from "../controllers/controllers.js";
import {upload} from "../utils/multerConfig.js";
const router = Router();


router.post("/addEvidence", upload.array("Attachment", 5), asyncHandler(evidenceController.EvidenceAdd));
router.get("/getEvidence", asyncHandler(evidenceController.EvidenceFetch));
router.put("/updateEvidence/:id", upload.array("Attachment", 5), asyncHandler(evidenceController.EvidenceUpdate));
router.delete("/deleteEvidence/:id", asyncHandler(evidenceController.EvidenceDelete));

export default router;
