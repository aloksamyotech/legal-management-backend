import JudgeModel from "../models/judge.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddJudge = async (req) => {
  const companyId = req.user.companyId;
  const { Title, mobile, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newJudge = new JudgeModel({
    Title,
    mobile,
    description,
    companyId,
  });

  const createdJudge = await newJudge.save();

  if (!createdJudge) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdJudge;
};

export const GetAllJudges = async (req) => {
  const companyId = req.user.companyId;
  const judges = await JudgeModel.find({ active: true, companyId }).sort({
    createdAt: -1,
  });

  if (!judges || judges?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return judges;
};

// Get Judge by ID
export const GetJudge = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const judge = await JudgeModel.findOne({ _id: id, active: true });

  if (!judge) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return judge;
};

export const UpdateJudge = async (req) => {
  const { id } = req.params;
  const { Title, mobile, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedJudge = await JudgeModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, mobile, description },
    { new: true },
  );

  if (!updatedJudge) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedJudge;
};

export const DeleteJudge = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const judge = await JudgeModel.findOne({ _id: id, active: true });

  if (!judge) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  judge.active = false;
  await judge.save();

  return { message: Message?.Delete, judge };
};
export const GetAllJudgesIndex = async (req) => {
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

  const judgesQuery = JudgeModel.find({
    active: true,
    companyId,
    ...searchCondition,
  }).sort({ createdAt: -1 });

  const totalJudges = await JudgeModel.countDocuments({
    active: true,
    companyId,
    ...searchCondition,
  });

  const judges = await judgesQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!judges || judges?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    judges,
    totalJudges,
    page: pageNumber,
    totalPages: Math.ceil(totalJudges / pageSize),
  };
};
