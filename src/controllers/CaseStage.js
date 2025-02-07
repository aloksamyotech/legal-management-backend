import * as caseStageService from "../services/caseStage.js";
import { statusCodes } from "../core/common/constant.js";
const CaseStageAdd = async (req, res, next) => {
  const CaseStageData = await caseStageService.AddCaseStage(req, res, next);
  res.status(statusCodes?.created).send(CaseStageData);
};
const CaseStageFetch = async (req, res, next) => {
  const CaseStageData = await caseStageService.GetCaseStage(req, res, next);
  res.status(statusCodes?.ok).send(CaseStageData);
};
const GetAllcaseStage = async (req, res, next) => {
  const CaseStageData = await caseStageService.GetAllCaseStages(req, res, next);
  res.status(statusCodes?.ok).send(CaseStageData);
};
const CaseStageDelete = async (req, res, next) => {
  const CaseStageDelData = await caseStageService.DeleteCaseStage(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(CaseStageDelData);
};
const CaseStageUpdate = async (req, res, next) => {
  const CaseStageUpdateData = await caseStageService.UpdateCaseStage(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(CaseStageUpdateData);
};

export default {
  CaseStageAdd,
  CaseStageFetch,
  CaseStageDelete,
  CaseStageUpdate,
  GetAllcaseStage,
};
