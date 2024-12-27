import ExpenseTypeModel from "../models/ExpenseType.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddExpenseType = async (req) => {
  const { Title, description } = req.body;

  if (!Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  const newExpenseType = new ExpenseTypeModel({
    Title,
    description,
  });

  const createdExpenseType = await newExpenseType.save();

  if (!createdExpenseType) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdExpenseType;
};

export const GetAllExpenseTypes = async () => {
  const expenseTypes = await ExpenseTypeModel.find({ active: true });

  if (!expenseTypes || expenseTypes.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return expenseTypes;
};

export const GetExpenseType = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const expenseType = await ExpenseTypeModel.findOne({ _id: id, active: true });

  if (!expenseType) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return expenseType;
};

export const UpdateExpenseType = async (req) => {
  const { id } = req.params;
  const { Title, description } = req.body;

  if (!id || !Title) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const updatedExpenseType = await ExpenseTypeModel.findOneAndUpdate(
    { _id: id, active: true },
    { Title, description },
    { new: true },
  );

  if (!updatedExpenseType) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedExpenseType;
};

export const DeleteExpenseType = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const expenseType = await ExpenseTypeModel.findOne({ _id: id, active: true });

  if (!expenseType) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  expenseType.active = false;
  await expenseType.save();

  return { message: Message?.Delete, expenseType };
};
