import * as invoiceService from "../services/invoice.js";
import { Message, statusCodes } from "../core/common/constant.js";
const InvoiceAdd = async (req, res, next) => {
  const InvoiceData = await invoiceService.AddInvoice(req, res, next);
  res.status(statusCodes?.created).send(InvoiceData);
};
const InvoiceFetch = async (req, res, next) => {
  const InvoiceData = await invoiceService.GetInvoices(req, res, next);
  res.status(statusCodes?.ok).send(InvoiceData);
};
const InvoiceDelete = async (req, res, next) => {
  const InvoiceDelData = await invoiceService.DeleteInvoice(req, res, next);
  res.status(statusCodes?.ok).send(InvoiceDelData);
};
const InvoiceUpdate = async (req, res, next) => {
  const InvoiceUpdateData = await invoiceService.UpdateInvoice(req, res, next);
  res.status(statusCodes?.ok).send(InvoiceUpdateData);
};

export default {
  InvoiceAdd,
  InvoiceFetch,
  InvoiceDelete,
  InvoiceUpdate,
};
