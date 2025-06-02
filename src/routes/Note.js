import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { noteController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addNote",
  upload.array("Attachment", 5),
  jwtMiddleware,
  asyncHandler(noteController.NoteAdd),
);
router.get(
  "/getAllNote",
  jwtMiddleware,
  asyncHandler(noteController.NoteFetch),
);
router.get(
  "/getAllNoteforpage",
  jwtMiddleware,
  asyncHandler(noteController.NoteFetchpage),
);
router.get("/getNote/:id", asyncHandler(noteController.NoteById));
router.put(
  "/updateNote/:id",
  upload.array("Attachment", 5),
  asyncHandler(noteController.NoteUpdate),
);
router.delete("/deleteNote/:id", asyncHandler(noteController.NoteDelete));
export default router;
