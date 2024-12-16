import * as caseService from "../services/case.js"
import { Message, statusCodes } from "../core/common/constant.js";
const CaseAdd = async (req, res, next) => {
  const CaseData = await caseService.AddCase(req, res, next);
  res.status(statusCodes?.created).send(CaseData);
};
const CaseFetch = async (req, res, next) => {
  const CaseData = await caseService.GetCase(req, res, next);
  res.status(statusCodes?.found).send(CaseData);

};
const CaseDelete = async (req, res, next) => {
  const CaseDelData = await caseService.DeleteCase(req, res, next);
  res.status(statusCodes?.ok).send(CaseDelData);
};
const CaseUpdate = async (req, res, next) => {
  const CaseUpdateData = await caseService.UpdateCase(req, res, next);
  res.status(statusCodes?.ok).send(CaseUpdateData);
};

export default {
  CaseAdd,
  CaseFetch,
  CaseDelete,
  CaseUpdate
};
