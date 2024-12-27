import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { noteController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addNote",
  upload.array("Attachment", 5),
  asyncHandler(noteController.NoteAdd),
);
router.get("/getAllNote", asyncHandler(noteController.NoteFetch));
router.get("/getNote/:id", asyncHandler(noteController.NoteById));
router.put(
  "/updateNote/:id",
  upload.array("Attachment", 5),
  asyncHandler(noteController.NoteUpdate),
);
router.delete("/deleteNote/:id", asyncHandler(noteController.NoteDelete));
export default router;
