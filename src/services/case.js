import CaseModel from "../models/Case.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import HearingModel from "../models/Hearing.js";
import Evidence  from "../models/Evidence.js";
import Document from "../models/Document.js";

export const AddCase = async (req) => {
  const {
    Title,
    Date,
    Client,
    Advocate,
    Matter,
    Judge,
    PoliceStation,
    Court,
    Fir,
    description,
    internalNote,
  } = req.body;

  if (!Title || !Date || !Client || !Advocate || !Matter || !Judge || !PoliceStation || !Court || !Fir) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newCase = new CaseModel({
    Title,
    Date,
    Client,
    Advocate,
    Matter,
    Judge,
    PoliceStation,
    Court,
    Fir,
    description,
    internalNote,
    Active: true,
  });

  const createdCase = await newCase.save();

  if (!createdCase) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdCase;
};

export const GetCase = async () => {
  const cases = await CaseModel.find({ Active: true }).populate([
    { path: "Client", select: "Name" }, 
    { path: "Advocate", select: "name" },
    { path: "Matter", select: "Title" }, 
        { path: "Judge", select: "Title" }, 
    { path: "PoliceStation", select: "Title" }, 
    { path: "Court", select: "Title"}, 
  ]).sort({ createdAt: -1 });

  if (!cases || cases.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return cases;
};

export const UpdateCase = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedCase = await CaseModel.findOneAndUpdate(
    { _id: id, Active: true },
    updateData,
    { new: true },
  )

  if (!updatedCase) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedCase;
};

export const DeleteCase = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const deletedCase = await CaseModel.findOneAndUpdate(
    { _id: id, Active: true },
    { Active: false },
    { new: true },
  );

  if (!deletedCase) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }
  await Promise.all([
    HearingModel.updateMany({ Case: id, Active: true }, { Active: false }),
    Evidence.updateMany({ Case: id, Active: true }, { Active: false }),
    Document.updateMany({ Case: id, Active: true }, { Active: false }),
  ]);
  return { message: Message?.Delete, case: deletedCase };
};
export const GetCaseById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request
    );
  }

  const caseData = await CaseModel.findOne({ _id: id, Active: true }).populate([
    { path: "Client", select: "Name" },
    { path: "Advocate", select: "name" },
    { path: "Matter", select: "Title" },
    { path: "Judge", select: "Title" },
    { path: "PoliceStation", select: "Title" },
    { path: "Court", select: "Title" },
  ]);

  if (!caseData) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return caseData;
};
