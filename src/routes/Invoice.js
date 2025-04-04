import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { invoiceController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JWTAuthentication.js";
const router = Router();
router.post(
  "/addInvoice",
  jwtMiddleware,
  asyncHandler(invoiceController.InvoiceAdd),
);
router.get(
  "/getAllInvoice",
  jwtMiddleware,
  asyncHandler(invoiceController.AllInvoiceFetch),
);
router.get("/getInvoice/:id", asyncHandler(invoiceController.InvoiceFetchByid));
router.get(
  "/getinvoicebycase/:caseId",
  asyncHandler(invoiceController.InvoiceFetchByCase),
);
router.delete(
  "/deleteInvoice/:id",
  asyncHandler(invoiceController.InvoiceDelete),
);
router.put("/updateInvoice/:id", asyncHandler(invoiceController.InvoiceUpdate));
router.put(
  "/updateInvoicePayment",
  asyncHandler(invoiceController.Invoicepayment),
);
export default router;
