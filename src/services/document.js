import Document from "../models/Document.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddDocument = async (req) => {
  const { Title, Case, Note } = req.body;
  const companyId = req.user.companyId;
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
    companyId,
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

export const GetAllDocuments = async (req) => {
  const companyId = req.user.companyId;
  const documents = await Document.find({ Active: true, companyId })
    .populate("Case", "Title")
    .sort({ createdAt: -1 });

  if (!documents || documents?.length === 0) {
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

  if (files?.length) {
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

  if (!document || document?.length === 0) {
    return {
      status: statusCodes?.notFound,
      message: Message?.notFound,
      errorCode: errorCodes?.not_found,
      document: [],
    };
  }

  return document;
};
export const GetAllDocforpage = async (req) => {
  const companyId = req.user.companyId;
  const { page, limit, search } = req.query;
  const searchCondition = search
    ? { Title: { $regex: search, $options: "i" } }
    : {};

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    throw new CustomError(
      statusCodes?.badRequest,
      "Invalid page number",
      errorCodes?.invalidInput,
    );
  }
  if (isNaN(pageSize) || pageSize <= 0) {
    throw new CustomError(
      statusCodes?.badRequest,
      "Invalid page size",
      errorCodes?.invalidInput,
    );
  }

  const documentsQuery = Document.find({
    Active: true,
    companyId,
    ...searchCondition,
  })
    .populate("Case", "Title")
    .sort({ createdAt: -1 });

  const totalDocuments = await Document.countDocuments({
    Active: true,
    companyId,
    ...searchCondition,
  });

  const documents = await documentsQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!documents || documents?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    documents,
    totalDocuments,
    page: pageNumber,
    totalPages: Math.ceil(totalDocuments / pageSize),
  };
};
