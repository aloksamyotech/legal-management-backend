import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { expenseController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post(
  "/addExpense",
  upload.array("Attachment", 5),
  asyncHandler(expenseController.ExpenseAdd),
);
router.get("/getAllExpense", asyncHandler(expenseController.ExpenseFetch));
router.get("/getExpense/:id", asyncHandler(expenseController.ExpenseById));
router.put(
  "/updateExpense/:id",
  upload.array("Attachment", 5),
  asyncHandler(expenseController.ExpenseUpdate),
);
router.delete(
  "/deleteExpense/:id",
  asyncHandler(expenseController.ExpenseDelete),
);
export default router;
