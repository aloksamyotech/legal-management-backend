import CourtModel from "../models/Court.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddCourt = async (req) => {
  const { Title, address, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newCourt = new CourtModel({
    Title,
    address,
    description,
  });

  const createdCourt = await newCourt.save();

  if (!createdCourt) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdCourt;
};

export const GetAllCourts = async () => {
  const courts = await CourtModel.find({ active: true });
  if (!courts || courts.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return courts;
};

export const GetCourt = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const court = await CourtModel.findOne({ _id: id, active: true });

  if (!court) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return court;
};

export const UpdateCourt = async (req) => {
  const { id } = req.params;
  const { Title, address, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedCourt = await CourtModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, address, description },
    { new: true },
  );

  if (!updatedCourt) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedCourt;
};

export const DeleteCourt = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const court = await CourtModel.findOne({ _id: id, active: true });

  if (!court) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  court.active = false;
  await court.save();

  return { message: Message?.Delete, court };
};
