import * as advocateService from "../services/advocate.js";
import { Message, statusCodes } from "../core/common/constant.js";
const AdvocateAdd = async (req, res, next) => {
  const AdvocateData = await advocateService.AddAdvocate(req, res, next);
  res.status(statusCodes?.created).send(AdvocateData);
};
const AdvocateFetch = async (req, res, next) => {
  const AdvocateData = await advocateService.GetAdvocate(req, res, next);
  res.status(statusCodes?.ok).send(AdvocateData);
};
const GetAlladvocate = async (req, res, next) => {
  const AdvocateData = await advocateService.GetAllAdvocates(req, res, next);
  res.status(statusCodes?.ok).send(AdvocateData);
};
const AdvocateDelete = async (req, res, next) => {
  const AdvocateDelData = await advocateService.DeleteAdvocate(req, res, next);
  res.status(statusCodes?.ok).send(AdvocateDelData);
};
const AdvocateUpdate = async (req, res, next) => {
  const AdvocateUpdateData = await advocateService.UpdateAdvocate(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(AdvocateUpdateData);
};

export default {
  AdvocateAdd,
  AdvocateFetch,
  AdvocateDelete,
  AdvocateUpdate,
  GetAlladvocate,
};
