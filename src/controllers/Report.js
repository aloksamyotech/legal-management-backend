import * as reportservice from "../services/report.js";
import { statusCodes } from "../core/common/constant.js";
const HearingRepoFetch = async (req, res, next) => {
  const hearingData = await reportservice.GetAllHearingRepo(req, res, next);
  res.status(statusCodes?.ok).send(hearingData);
};
const CaseRepoFetch = async (req, res, next) => {
  const caseData = await reportservice.GetCaseRepo(req, res, next);
  res.status(statusCodes?.ok).send(caseData);
};

export default {
  HearingRepoFetch,
  CaseRepoFetch,
};
