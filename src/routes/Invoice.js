import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { invoiceController } from "../controllers/controllers.js";
import { upload } from "../utils/multerConfig.js";
const router = Router();
router.post("/addInvoice",upload.single("avatar"),asyncHandler(invoiceController.InvoiceAdd),);
router.get("/getInvoice", asyncHandler(invoiceController.InvoiceFetch));
router.delete("/deleteInvoice/:id", asyncHandler(invoiceController.InvoiceDelete));
router.put("/updateInvoice/:id", upload.single("avatar"), asyncHandler(invoiceController.InvoiceUpdate),
);
export default router;
