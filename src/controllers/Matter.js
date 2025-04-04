import * as matterService from "../services/matter.js";
import { statusCodes } from "../core/common/constant.js";
const MatterAdd = async (req, res, next) => {
  const MatterData = await matterService.AddMatter(req, res, next);
  res.status(statusCodes?.created).send(MatterData);
};
const MatterFetch = async (req, res, next) => {
  const MatterData = await matterService.GetMatter(req, res, next);
  res.status(statusCodes?.ok).send(MatterData);
};
const GetAllmatter = async (req, res, next) => {
  const MatterData = await matterService.GetAllMatters(req, res, next);
  res.status(statusCodes?.ok).send(MatterData);
};
const MatterDelete = async (req, res, next) => {
  const MatterDelData = await matterService.DeleteMatter(req, res, next);
  res.status(statusCodes?.ok).send(MatterDelData);
};
const MatterUpdate = async (req, res, next) => {
  const MatterUpdateData = await matterService.UpdateMatter(req, res, next);
  res.status(statusCodes?.ok).send(MatterUpdateData);
};

export default {
  MatterAdd,
  MatterFetch,
  MatterDelete,
  MatterUpdate,
  GetAllmatter,
};
