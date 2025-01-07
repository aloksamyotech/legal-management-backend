import CaseStageModel from "../models/CaseStage.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddCaseStage = async (req) => {
  const { Title, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newCaseStage = new CaseStageModel({
    Title,
    description,
  });

  const createdCaseStage = await newCaseStage.save();

  if (!createdCaseStage) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdCaseStage;
};

export const GetAllCaseStages = async () => {
  const caseStages = await CaseStageModel.find({ active: true }).sort({ createdAt: -1 });

  if (!caseStages || caseStages.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return caseStages;
};

export const GetCaseStage = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const caseStage = await CaseStageModel.findOne({ _id: id, active: true });

  if (!caseStage) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return caseStage;
};

export const UpdateCaseStage = async (req) => {
  const { id } = req.params;
  const { Title, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedCaseStage = await CaseStageModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, description },
    { new: true },
  );

  if (!updatedCaseStage) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedCaseStage;
};

export const DeleteCaseStage = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const caseStage = await CaseStageModel.findOne({ _id: id, active: true });

  if (!caseStage) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  caseStage.active = false;
  await caseStage.save();

  return { message: Message?.Delete, caseStage };
};
