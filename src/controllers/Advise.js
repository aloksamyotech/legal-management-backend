import * as adviseService from "../services/advise.js";
import { statusCodes } from "../core/common/constant.js";
const AdviseAdd = async (req, res, next) => {
  const AdviseData = await adviseService.AddAdvise(req, res, next);
  res.status(statusCodes?.created).send(AdviseData);
};
const AdviseFetch = async (req, res, next) => {
  const AdviseData = await adviseService.GetAdvise(req, res, next);
  res.status(statusCodes?.ok).send(AdviseData);
};
const AdviseDelete = async (req, res, next) => {
  const AdviseDelData = await adviseService.DeleteAdvise(req, res, next);
  res.status(statusCodes?.ok).send(AdviseDelData);
};
const AdviseUpdate = async (req, res, next) => {
  const AdviseUpdateData = await adviseService.UpdateAdvise(req, res, next);
  res.status(statusCodes?.ok).send(AdviseUpdateData);
};
const AdvisepaymentUpdate = async (req, res, next) => {
  const AdviseUpdateData = await adviseService.updatePayment(req, res, next);
  res.status(statusCodes?.ok).send(AdviseUpdateData);
};
const SingleAdviceFetch = async (req, res, next) => {
  const SingleAdviseData = await adviseService.GetAdviseById(req, res, next);
  res.status(statusCodes?.ok).send(SingleAdviseData);
};
const AdviseFetchpage = async (req, res, next) => {
  const AdviseData = await adviseService.GetAdvforPagination(req, res, next);
  res.status(statusCodes?.ok).send(AdviseData);
};

export default {
  AdviseFetchpage,
  AdviseAdd,
  AdviseFetch,
  AdviseDelete,
  AdviseUpdate,
  AdvisepaymentUpdate,
  SingleAdviceFetch,
};
