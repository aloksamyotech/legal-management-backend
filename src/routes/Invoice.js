import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { invoiceController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post("/addInvoice", asyncHandler(invoiceController.InvoiceAdd));
router.get("/getAllInvoice", asyncHandler(invoiceController.AllInvoiceFetch));
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
router.put("/updateInvoicePayment", asyncHandler(invoiceController.Invoicepayment));
export default router;
