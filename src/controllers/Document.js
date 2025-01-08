import * as documentService from "../services/document.js";
import { Message, statusCodes } from "../core/common/constant.js";
const DocumentAdd = async (req, res, next) => {
  const DocumentData = await documentService.AddDocument(req, res, next);
  res.status(statusCodes?.created).send(DocumentData);
};
const DocumentFetch = async (req, res, next) => {
  const DocumentData = await documentService.GetAllDocuments(req, res, next);
  res.status(statusCodes?.ok).send(DocumentData);
};
const DocumentById = async (req, res, next) => {
  const DocumentData = await documentService.GetDocumentById(req, res, next);
  res.status(statusCodes?.ok).send(DocumentData);
};
const GetDocumentByCase = async (req, res, next) => {
  const DocumentData = await documentService.GetDocumentByCase(req, res, next);
  res.status(statusCodes?.ok).send(DocumentData);
};
const DocumentDelete = async (req, res, next) => {
  const DocumentDelData = await documentService.DeleteDocument(req, res, next);
  res.status(statusCodes?.ok).send(DocumentDelData);
};
const DocumentUpdate = async (req, res, next) => {
  const DocumentUpdateData = await documentService.UpdateDocument(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(DocumentUpdateData);
};

export default {
  DocumentAdd,
  DocumentFetch,
  DocumentById,
  DocumentDelete,
  DocumentUpdate,
  GetDocumentByCase,
};
