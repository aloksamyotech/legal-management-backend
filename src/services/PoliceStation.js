import PolicestationModel from "../models/PoliceStation.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddPolicestation = async (req) => {
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

export const GetAllPolicestations = async () => {
  const policestations = await PolicestationModel.find({ active: true });

  if (!policestations || policestations.length === 0) {
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
