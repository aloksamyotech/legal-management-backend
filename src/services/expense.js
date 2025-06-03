import ExpenseModel from "../models/Expense.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const AddExpense = async (req) => {
  const { Title, Case, Type, Amount, Description } = req.body;
  const companyId = req.user.companyId;
  // Check for required fields
  if (!Title || !Case || !Type || !Amount) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.Missing_required_field,
      errorCodes?.bad_request,
    );
  }

  // Process file attachments
  const files = req.files?.map((file) => ({
    name: file?.originalname,
    url: `/uploads/${file.filename}`,
    type: file.mimetype,
  }));

  const newExpense = new ExpenseModel({
    Title,
    Case,
    Type,
    Amount,
    Attachment: files || [],
    Description,
    companyId,
  });

  const createdExpense = await newExpense.save();

  if (!createdExpense) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.notCreated,
      errorCodes?.service_unavailable,
    );
  }

  return createdExpense;
};

export const GetExpense = async (req) => {
  const companyId = req.user.companyId;
  const expenses = await ExpenseModel.find({ Active: true, companyId })
    .populate("Type", "Title")
    .populate("Case", "Title")
    .sort({ createdAt: -1 });

  if (!expenses || expenses?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return expenses;
};

export const GetExpenseById = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const expense = await ExpenseModel.findOne({ _id: id, Active: true })
    .populate("Type", "Title")
    .populate("Case", "Title");

  if (!expense) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return expense;
};

export const UpdateExpense = async (req) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const expense = await ExpenseModel.findOne({ _id: id, Active: true });

  if (!expense) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.not_found,
    );
  }

  const files = req.files?.map((file) => ({
    name: file?.originalname,
    url: `/uploads/${file?.filename}`,
    type: file?.mimetype,
  }));

  if (files?.length) {
    updateData.Attachment = files;
  }

  const updatedExpense = await ExpenseModel.findByIdAndUpdate(
    { _id: id },
    updateData,
    {
      new: true,
    },
  );

  if (!updatedExpense) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }

  return updatedExpense;
};

export const DeleteExpense = async (req) => {
  const { id } = req.params;

  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }

  const deletedExpense = await ExpenseModel.findByIdAndUpdate(
    id,
    { Active: false },
    { new: true },
  );

  if (!deletedExpense) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notDeleted,
      errorCodes?.not_found,
    );
  }

  return { message: Message.Delete, expense: deletedExpense };
};
export const GetExpforpage = async (req) => {
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
  const expensesQuery = ExpenseModel.find({
    Active: true,
    companyId,
    ...searchCondition,
  })
    .populate("Type", "Title")
    .populate("Case", "Title")
    .sort({ createdAt: -1 });
  const totalExpenses = await ExpenseModel.countDocuments({
    Active: true,
    companyId,
    ...searchCondition,
  });

  const expenses = await expensesQuery
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  if (!expenses || expenses?.length === 0) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    expenses,
    totalExpenses,
    page: pageNumber,
    totalPages: Math.ceil(totalExpenses / pageSize),
  };
};
