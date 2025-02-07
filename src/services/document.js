import Document from "../models/Document.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddDocument = async (req) => {
  const { Title, Case, Note } = req.body;

  if (!Title || !Case || !Note) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const files = req?.files?.map((file) => ({
    name: file?.originalname,
    url: `/uploads/${file?.filename}`,
    type: file?.mimetype,
  }));

  const newDocument = new Document({
    Title,
    Case,
    Note,
    Attachment: files || [],
    Active: true,
  });

  const createdDocument = await newDocument.save();

  if (!createdDocument) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdDocument;
};

export const GetAllDocuments = async () => {
  const documents = await Document.find({ Active: true })
    .populate("Case", "Title")
    .sort({ createdAt: -1 });

  if (!documents || documents.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return documents;
};

export const GetDocumentById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const document = await Document.findOne({ _id: id, Active: true }).populate(
    "Case",
    "Title",
  );

  if (!document) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return document;
};

export const UpdateDocument = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const files = req?.files?.map((file) => ({
    name: file?.originalname,
    url: `/uploads/${file?.filename}`,
    type: file?.mimetype,
  }));

  if (files) {
    updateData.Attachment = files;
  }

  const updatedDocument = await Document.findOneAndUpdate(
    { _id: id, Active: true },
    updateData,
    { new: true },
  );

  if (!updatedDocument) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedDocument;
};

export const DeleteDocument = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const document = await Document.findOne({ _id: id, Active: true });

  if (!document) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  document.Active = false;
  await document.save();

  return { message: Message?.Delete, document };
};

export const GetDocumentByCase = async (req) => {
  const { caseId } = req.params;

  const document = await Document.find({ Case: caseId, Active: true }).populate(
    "Case",
    "Title",
  );

  if (!document || document.length === 0) {
    return {
      status: statusCodes?.notFound,
      message: Message?.notFound,
      errorCode: errorCodes?.not_found,
      document: [],
    };
  }

  return document;
};
