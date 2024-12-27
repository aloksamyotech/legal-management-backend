import * as courtService from "../services/court.js";
import { Message, statusCodes } from "../core/common/constant.js";
const CourtAdd = async (req, res, next) => {
  const CourtData = await courtService.AddCourt(req, res, next);
  res.status(statusCodes?.created).send(CourtData);
};
const CourtFetch = async (req, res, next) => {
  const CourtData = await courtService.GetCourt(req, res, next);
  res.status(statusCodes?.ok).send(CourtData);
};
const GetAllcourt = async (req, res, next) => {
  const CourtData = await courtService.GetAllCourts(req, res, next);
  res.status(statusCodes?.ok).send(CourtData);
};
const CourtDelete = async (req, res, next) => {
  const CourtDelData = await courtService.DeleteCourt(req, res, next);
  res.status(statusCodes?.ok).send(CourtDelData);
};
const CourtUpdate = async (req, res, next) => {
  const CourtUpdateData = await courtService.UpdateCourt(req, res, next);
  res.status(statusCodes?.ok).send(CourtUpdateData);
};

export default {
  CourtAdd,
  CourtFetch,
  CourtDelete,
  CourtUpdate,
  GetAllcourt,
};
