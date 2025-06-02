import * as expenseTypeService from "../services/ExpenseType.js";
import { statusCodes } from "../core/common/constant.js";
const ExpenseTypeAdd = async (req, res, next) => {
  const ExpenseTypeData = await expenseTypeService.AddExpenseType(
    req,
    res,
    next,
  );
  res.status(statusCodes?.created).send(ExpenseTypeData);
};
const ExpenseTypeFetch = async (req, res, next) => {
  const ExpenseTypeData = await expenseTypeService.GetExpenseType(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(ExpenseTypeData);
};
const GetAllexpenseType = async (req, res, next) => {
  const ExpenseTypeData = await expenseTypeService.GetAllExpenseTypes(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(ExpenseTypeData);
};
const ExpenseTypeDelete = async (req, res, next) => {
  const ExpenseTypeDelData = await expenseTypeService.DeleteExpenseType(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(ExpenseTypeDelData);
};
const ExpenseTypeUpdate = async (req, res, next) => {
  const ExpenseTypeUpdateData = await expenseTypeService.UpdateExpenseType(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(ExpenseTypeUpdateData);
};

export default {
  ExpenseTypeAdd,
  ExpenseTypeFetch,
  ExpenseTypeDelete,
  ExpenseTypeUpdate,
  GetAllexpenseType,
};
