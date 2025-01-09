import * as invoiceService from "../services/invoice.js";
import { Message, statusCodes } from "../core/common/constant.js";
const InvoiceAdd = async (req, res, next) => {
  const InvoiceData = await invoiceService.AddInvoice(req, res, next);
  res.status(statusCodes?.created).send(InvoiceData);
};
const InvoiceFetchByid = async (req, res, next) => {
  const InvoiceData = await invoiceService.GetInvoiceById(req, res, next);
  res.status(statusCodes?.ok).send(InvoiceData);
};
const AllInvoiceFetch = async (req, res, next) => {
  const InvoiceData = await invoiceService.GetInvoices(req, res, next);
  res.status(statusCodes?.ok).send(InvoiceData);
};
const InvoiceFetchByCase = async (req, res, next) => {
  const InvoiceData = await invoiceService.GetInvoiceByCaseId(req, res, next);
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
  InvoiceFetchByid,
  AllInvoiceFetch,
  InvoiceFetchByCase,
  InvoiceDelete,
  InvoiceUpdate,
};
