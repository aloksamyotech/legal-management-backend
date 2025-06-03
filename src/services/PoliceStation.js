import PolicestationModel from "../models/PoliceStation.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddPolicestation = async (req) => {
  const companyId = req.user.companyId;
  const { Title, Location, Contact } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newPolicestation = new PolicestationModel({
    Title,
    Location,
    Contact,
    companyId,
  });

  const createdPolicestation = await newPolicestation.save();

  if (!createdPolicestation) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdPolicestation;
};

export const GetAllPolicestations = async (req) => {
  const companyId = req.user.companyId;
  const policestations = await PolicestationModel.find({
    active: true,
    companyId,
  }).sort({
    createdAt: -1,
  });

  if (!policestations || policestations?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return policestations;
};

export const GetPolicestation = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const policestation = await PolicestationModel.findOne({
    _id: id,
    active: true,
  });

  if (!policestation) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return policestation;
};

export const UpdatePolicestation = async (req) => {
  const { id } = req.params;
  const { Title, Location, Contact } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedPolicestation = await PolicestationModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, Location, Contact },
    { new: true },
  );

  if (!updatedPolicestation) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedPolicestation;
};

export const DeletePolicestation = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const policestation = await PolicestationModel.findOne({
    _id: id,
    active: true,
  });

  if (!policestation) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  policestation.active = false;
  await policestation.save();

  return { message: Message?.Delete, policestation };
};
export const GetAllPolicestationsIndex = async (req) => {
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

  const policestationsQuery = PolicestationModel.find({
    active: true,
    companyId,
    ...searchCondition,
  }).sort({ createdAt: -1 });

  const totalPolicestations = await PolicestationModel.countDocuments({
    active: true,
    companyId,
    ...searchCondition,
  });

  const policestations = await policestationsQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!policestations || policestations.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    policestations,
    totalPolicestations,
    page: pageNumber,
    totalPages: Math.ceil(totalPolicestations / pageSize),
  };
};
