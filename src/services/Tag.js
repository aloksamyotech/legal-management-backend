import TagModel from "../models/Tag.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddTag = async (req) => {
  const { Title, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newTag = new TagModel({
    Title,
    description,
  });

  const createdTag = await newTag.save();

  if (!createdTag) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdTag;
};

export const GetAllTags = async () => {
  const tags = await TagModel.find({ active: true });

  if (!tags || tags.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return tags;
};

export const GetTag = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const tag = await TagModel.findOne({ _id: id, active: true });

  if (!tag) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return tag;
};

export const UpdateTag = async (req) => {
  const { id } = req.params;
  const { Title, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedTag = await TagModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, description },
    { new: true },
  );

  if (!updatedTag) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedTag;
};

export const DeleteTag = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const tag = await TagModel.findOne({ _id: id, active: true });

  if (!tag) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  tag.active = false;
  await tag.save();

  return { message: Message?.Delete, tag };
};
