import * as policestationService from "../services/PoliceStation.js";
import { Message, statusCodes } from "../core/common/constant.js";
const PolicestationAdd = async (req, res, next) => {
  const PolicestationData = await policestationService.AddPolicestation(
    req,
    res,
    next,
  );
  res.status(statusCodes?.created).send(PolicestationData);
};
const PolicestationFetch = async (req, res, next) => {
  const PolicestationData = await policestationService.GetPolicestation(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PolicestationData);
};
const GetAllpolicestation = async (req, res, next) => {
  const PolicestationData = await policestationService.GetAllPolicestations(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PolicestationData);
};
const PolicestationDelete = async (req, res, next) => {
  const PolicestationDelData = await policestationService.DeletePolicestation(
    req,
    res,
    next,
  );
  res.status(statusCodes?.ok).send(PolicestationDelData);
};
const PolicestationUpdate = async (req, res, next) => {
  const PolicestationUpdateData =
    await policestationService.UpdatePolicestation(req, res, next);
  res.status(statusCodes?.ok).send(PolicestationUpdateData);
};

export default {
  PolicestationAdd,
  PolicestationFetch,
  PolicestationDelete,
  PolicestationUpdate,
  GetAllpolicestation,
};
