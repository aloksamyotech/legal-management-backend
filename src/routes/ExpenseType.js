import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { expenseTypeController } from "../controllers/controllers.js";
const router = Router();
router.post(
  "/addExpenseType",
  asyncHandler(expenseTypeController.ExpenseTypeAdd),
);
router.get(
  "/getExpenseType",
  asyncHandler(expenseTypeController.ExpenseTypeFetch),
);
router.get(
  "/getAllExpenseType",
  asyncHandler(expenseTypeController.GetAllexpenseType),
);
router.delete(
  "/deleteExpenseType/:id",
  asyncHandler(expenseTypeController.ExpenseTypeDelete),
);
router.put(
  "/updateExpenseType/:id",
  asyncHandler(expenseTypeController.ExpenseTypeUpdate),
);
export default router;
