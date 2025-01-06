import PracticeModel from "../models/practicearea.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddPractice = async (req) => {
  const { Title, address, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newPractice = new PracticeModel({
    Title,
    address,
    description,
  });

  const createdPractice = await newPractice.save();

  if (!createdPractice) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdPractice;
};

export const GetAllPractices = async () => {
  const practices = await PracticeModel.find({ active: true });

  if (!practices || practices.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return practices;
};

export const GetPractice = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const practice = await PracticeModel.findOne({ _id: id, active: true });

  if (!practice) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return practice;
};

export const UpdatePractice = async (req) => {
  const { id } = req.params;
  const { Title, address, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedPractice = await PracticeModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, address, description },
    { new: true },
  );

  if (!updatedPractice) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedPractice;
};

export const DeletePractice = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const practice = await PracticeModel.findOne({ _id: id, active: true });

  if (!practice) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  practice.active = false;
  await practice.save();

  return { message: Message?.Delete, practice };
};
