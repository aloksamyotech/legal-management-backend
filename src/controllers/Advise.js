import * as adviseService from "../services/advise.js";
import { Message, statusCodes } from "../core/common/constant.js";
const AdviseAdd = async (req, res, next) => {
  const AdviseData = await adviseService.AddAdvise(req, res, next);
  res.status(statusCodes?.created).send(AdviseData);
};
const AdviseFetch = async (req, res, next) => {
  const AdviseData = await adviseService.GetAdvise(req, res, next);
  res.status(statusCodes?.found).send(AdviseData);

};
const AdviseDelete = async (req, res, next) => {
  const AdviseDelData = await adviseService.DeleteAdvise(req, res, next);
  res.status(statusCodes?.ok).send(AdviseDelData);
};
const AdviseUpdate = async (req, res, next) => {
  const AdviseUpdateData = await adviseService.UpdateAdvise(req, res, next);
  res.status(statusCodes?.ok).send(AdviseUpdateData);
};

export default {
  AdviseAdd,
  AdviseFetch,
  AdviseDelete,
  AdviseUpdate
};
