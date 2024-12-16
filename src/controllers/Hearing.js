import * as hearingService from "../services/hearing.js"
import { Message, statusCodes } from "../core/common/constant.js";
const HearingAdd = async (req, res, next) => {
  const HearingData = await hearingService.AddHearing(req, res, next);
  res.status(statusCodes?.created).send(HearingData);
};
const HearingFetch = async (req, res, next) => {
  const HearingData = await hearingService.GetHearing(req, res, next);
  res.status(statusCodes?.found).send(HearingData);
}
const AllHearingFetch = async (req, res, next) => {
  const AllHearingData = await hearingService.GetAllHearing(req, res, next);
  res.status(statusCodes?.found).send(AllHearingData);
};
const HearingDelete = async (req, res, next) => {
  const HearingDelData = await hearingService.DeleteHearing(req, res, next);
  res.status(statusCodes?.ok).send(HearingDelData);
};
const HearingUpdate = async (req, res, next) => {
  const HearingDelData = await hearingService.UpdateHearing(req, res, next);
  res.status(statusCodes?.ok).send(HearingDelData);
};

export default {
  HearingAdd,
  HearingFetch,
  HearingDelete,
  HearingUpdate,
  AllHearingFetch
};
