import HearingModel from "../models/Hearing.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const AddHearing = async (req) => {
  const {
    Title,
    Fee,
    Client,
    Witness,
    JudgementStatus,
    Date,
    JudgementReason,
    Description,
    Case,
  } = req.body;

  if (!Title || !Fee || !Date || !Case) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const hearing = new HearingModel({
    Title,
    Fee,
    Witness,
    Client,
    JudgementStatus,
    Date,
    JudgementReason,
    Description,
    Case,
  });

  const savedHearing = await hearing.save();
  if (!savedHearing) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }
  return savedHearing;
};

export const GetHearing = async (req) => {
  const { id } = req.params;

  const hearing = await HearingModel.findOne({
    _id: id,
    Active: true,
  }).populate("Case");

  if (!hearing) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return hearing;
};
export const GetAllHearing = async () => {
  const allhearings = await HearingModel?.find({ Active: true })
    .populate("Case", "Title")
    .populate("Client", "Name")
    .sort({ createdAt: -1 });

  if (!allhearings || allhearings.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return allhearings;
};
export const DeleteHearing = async (req) => {
  const { id } = req.params;

  const deletedHearing = await HearingModel.findByIdAndUpdate(
    id,
    { Active: false },
    { new: true },
  );

  if (!deletedHearing) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }

  return { message: Message?.Delete, hearing: deletedHearing };
};
export const UpdateHearing = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedHearing = await HearingModel?.findOneAndUpdate(
    { _id: id, Active: true },
    updateData,
    { new: true },
  );

  if (!updatedHearing) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedHearing;
};

//===========================================Get Hearing api from case==========================
export const GetHearingsByCaseId = async (req) => {
  const { caseId } = req.params;

  if (!caseId) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.CaseId_required,
      errorCodes?.bad_request,
    );
  }

  const hearings = await HearingModel.find({ Case: caseId, Active: true });

  if (!hearings || hearings.length === 0) {
    return {
      status: statusCodes?.notFound,
      message: Message?.notFound,
      errorCode: errorCodes?.not_found,
      hearings: [],
    };
  }

  return hearings;
};
