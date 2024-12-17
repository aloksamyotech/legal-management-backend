import * as expenseService from "../services/expense.js"
import { Message, statusCodes } from "../core/common/constant.js";
const ExpenseAdd = async (req, res, next) => {
  const ExpenseData = await expenseService.AddExpense(req, res, next);
  res.status(statusCodes?.created).send(ExpenseData);
};
const ExpenseFetch = async (req, res, next) => {
  const ExpenseData = await expenseService.GetExpense(req, res, next);
  res.status(statusCodes?.found).send(ExpenseData);

};
const ExpenseById = async (req, res, next) => {
    const ExpenseData = await expenseService.GetExpenseById(req, res, next);
    res.status(statusCodes?.found).send(ExpenseData);
  
  };
const ExpenseDelete = async (req, res, next) => {
  const ExpenseDelData = await expenseService.DeleteExpense(req, res, next);
  res.status(statusCodes?.ok).send(ExpenseDelData);
};
const ExpenseUpdate = async (req, res, next) => {
  const ExpenseUpdateData = await expenseService.UpdateExpense(req, res, next);
  res.status(statusCodes?.ok).send(ExpenseUpdateData);
};

export default {
  ExpenseAdd,
  ExpenseFetch,
  ExpenseById,
  ExpenseDelete,
  ExpenseUpdate
};
