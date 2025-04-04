import CourtModel from "../models/Court.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddCourt = async (req) => {
  const { Title, address, description } = req.body;
  const companyId = req.user.companyId;
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
    companyId,
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

export const GetAllCourts = async (req) => {
  const companyId = req.user.companyId;
  const courts = await CourtModel.find({ active: true, companyId }).sort({
    createdAt: -1,
  });
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

export const GetAllCourtsIndex = async (req) => {
  const companyId = req.user.companyId;
  const { page, limit, search } = req.query;
  const searchCondition = search
    ? { Title: { $regex: search, $options: "i" } }
    : {};

  const pageNumber = parseInt(page);
  const pageSize = parseInt(limit);

  if (isNaN(pageNumber) || pageNumber <= 0) {
    throw new CustomError(
      statusCodes.badRequest,
      "Invalid page number",
      errorCodes.invalidInput,
    );
  }

  if (isNaN(pageSize) || pageSize <= 0) {
    throw new CustomError(
      statusCodes.badRequest,
      "Invalid page size",
      errorCodes.invalidInput,
    );
  }

  const courtsQuery = CourtModel.find({
    active: true,
    companyId,
    ...searchCondition,
  }).sort({ createdAt: -1 });

  const totalCourts = await CourtModel.countDocuments({
    active: true,
    companyId,
    ...searchCondition,
  });

  const courts = await courtsQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!courts || courts.length === 0) {
    throw new CustomError(
      statusCodes.notFound,
      Message.notFound,
      errorCodes.not_found,
    );
  }

  return {
    courts,
    totalCourts,
    page: pageNumber,
    totalPages: Math.ceil(totalCourts / pageSize),
  };
};
