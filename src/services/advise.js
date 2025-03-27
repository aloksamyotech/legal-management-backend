import { Advisedb } from "../models/Advise.js";
import mongoose from "mongoose";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
export const AddAdvise = async (req) => {
  const { Client, Advocate, Matter, Fee, Status, description, internalNote } =
    req.body;
  const companyId = req.user.companyId;
  if (!Client || !Advocate || !Matter || Fee === undefined || !Status) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const advise = new Advisedb({
    Client,
    Advocate,
    Matter,
    Fee,
    Status,
    description,
    internalNote,
    companyId,
  });

  const Advisecreate = await advise.save();

  if (!Advisecreate) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return Advisecreate;
};

export const GetAdvise = async (req) => {
  const companyId = req.user.companyId;
  const advises = await Advisedb.find({ Active: true, companyId })
    .sort({ createdAt: -1 })
    .populate("Client", "Name")
    .populate("Advocate", "name")
    .populate("Matter", "Title");

  if (!advises || advises.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return advises;
};

export const DeleteAdvise = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const deletedAdvise = await Advisedb.findOne({ _id: id, Active: true });

  if (!deletedAdvise) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }

  deletedAdvise.Active = false;
  await deletedAdvise.save();

  return { message: Message.Delete, advise: deletedAdvise };
};

export const UpdateAdvise = async (req) => {
  const { id } = req.params;
  const updateData = req.body;
  console.log("upd", updateData);
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedAdvise = await Advisedb.findOneAndUpdate(
    { _id: id },
    updateData,
    { new: true },
  );

  if (!updatedAdvise) {
    throw new CustomError(
      statusCodes?.notFound,
      Message.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedAdvise;
};
export const GetAdviseById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const advise = await Advisedb.findById(id)
    .populate("Client")
    .populate("Advocate", "name")
    .populate("Matter", "Title");

  if (!advise) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return advise;
};
export const updatePayment = async (req) => {
  const { id } = req.body;
  const { paymentStatus } = req.body;
  const validStatuses = ["Paid", "Unpaid"];
  if (!validStatuses.includes(paymentStatus)) {
    return;
  }

  const updatedAdvise = await Advisedb.findByIdAndUpdate(
    { _id: id },
    { Payment: paymentStatus },
    { new: true, runValidators: true },
  );

  if (!updatedAdvise) {
    return { error: "Advise not found" };
  }

  return updatedAdvise;
};
export const GetAdvforPagination = async (req) => {
  const companyId = req.user.companyId;
  const { page, limit, search } = req.query;

  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;

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

  const matchStage = {
    Active: true,
    companyId: new mongoose.Types.ObjectId(companyId),
  };
  const pipeline = [
    { $match: matchStage },
    {
      $lookup: {
        from: "clients",
        localField: "Client",
        foreignField: "_id",
        as: "Client",
      },
    },
    { $unwind: { path: "$Client", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "matters",
        localField: "Matter",
        foreignField: "_id",
        as: "Matter",
      },
    },
    { $unwind: { path: "$Matter", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "advocates",
        localField: "Advocate",
        foreignField: "_id",
        as: "Advocate",
      },
    },
    { $unwind: { path: "$Advocate", preserveNullAndEmptyArrays: true } },
    {
      $match: search
        ? {
            $or: [
              { "Client.Name": { $regex: search, $options: "i" } },
              { "Advocate.name": { $regex: search, $options: "i" } },
            ],
          }
        : {},
    },
    { $sort: { createdAt: -1 } },
    { $skip: (pageNumber - 1) * pageSize },
    { $limit: pageSize },
  ];
  const advises = await Advisedb.aggregate(pipeline);
  const totalAdvises = await Advisedb.countDocuments(matchStage);

  if (!advises.length) {
    throw new CustomError(
      statusCodes.notFound,
      Message.notFound,
      errorCodes.not_found,
    );
  }

  return {
    advises,
    totalAdvises,
    page: pageNumber,
    totalPages: Math.ceil(totalAdvises / pageSize),
  };
};
