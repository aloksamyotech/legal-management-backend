import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { expenseController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addExpense",
  jwtMiddleware,
  upload.array("Attachment", 5),
  asyncHandler(expenseController.ExpenseAdd),
);
router.get(
  "/getAllExpense",
  jwtMiddleware,
  asyncHandler(expenseController.ExpenseFetch),
);
router.get(
  "/getAllExpforpage",
  jwtMiddleware,
  asyncHandler(expenseController.getexpforpage),
);
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
