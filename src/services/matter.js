import MatterModel from "../models/Matter.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddMatter = async (req) => {
  const { Title, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newMatter = new MatterModel({
    Title,
    description,
  });

  const createdMatter = await newMatter.save();

  if (!createdMatter) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdMatter;
};

export const GetAllMatters = async () => {
  const matters = await MatterModel.find({ active: true }).sort({ createdAt: -1 });

  if (!matters || matters.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return matters;
};

export const GetMatter = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const matter = await MatterModel.findOne({ _id: id, active: true });

  if (!matter) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return matter;
};

export const UpdateMatter = async (req) => {
  const { id } = req.params;
  const { Title, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedMatter = await MatterModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, description },
    { new: true },
  );

  if (!updatedMatter) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedMatter;
};

export const DeleteMatter = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const matter = await MatterModel.findOne({ _id: id, active: true });

  if (!matter) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  matter.active = false;
  await matter.save();

  return { message: Message?.Delete, matter };
};
