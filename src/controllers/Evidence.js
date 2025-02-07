import * as evidenceService from "../services/evidence.js";
import { statusCodes } from "../core/common/constant.js";
const EvidenceAdd = async (req, res, next) => {
  const EvidenceData = await evidenceService.AddEvidence(req, res, next);
  res.status(statusCodes?.created).send(EvidenceData);
};
const EvidenceFetch = async (req, res, next) => {
  const EvidenceData = await evidenceService.GetEvidence(req, res, next);
  res.status(statusCodes?.ok).send(EvidenceData);
};
const EvidenceFetchbyId = async (req, res, next) => {
  const EvidenceData = await evidenceService.GetEvidenceById(req, res, next);
  res.status(statusCodes?.ok).send(EvidenceData);
};
const EvidencebyCaseFetch = async (req, res, next) => {
  const EvidenceData = await evidenceService.GetEvidenceByCase(req, res, next);
  res.status(statusCodes?.ok).send(EvidenceData);
};
const EvidenceDelete = async (req, res, next) => {
  const EvidenceDelData = await evidenceService.DeleteEvidence(req, res, next);
  res.status(statusCodes?.ok).send(EvidenceDelData);
};
const EvidenceUpdate = async (req, res, next) => {
  const EvidenceUpdateData = await evidenceService.UpdateEvidence(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(EvidenceUpdateData);
};

export default {
  EvidenceAdd,
  EvidenceFetch,
  EvidenceFetchbyId,
  EvidenceDelete,
  EvidenceUpdate,
  EvidencebyCaseFetch,
};
