import * as tagService from "../services/Tag.js";
import { Message, statusCodes } from "../core/common/constant.js";
const TagAdd = async (req, res, next) => {
  const TagData = await tagService.AddTag(req, res, next);
  res.status(statusCodes?.created).send(TagData);
};
const TagFetch = async (req, res, next) => {
  const TagData = await tagService.GetTag(req, res, next);
  res.status(statusCodes?.ok).send(TagData);
};
const GetAlltag = async (req, res, next) => {
  const TagData = await tagService.GetAllTags(req, res, next);
  res.status(statusCodes?.ok).send(TagData);
};
const TagDelete = async (req, res, next) => {
  const TagDelData = await tagService.DeleteTag(req, res, next);
  res.status(statusCodes?.ok).send(TagDelData);
};
const TagUpdate = async (req, res, next) => {
  const TagUpdateData = await tagService.UpdateTag(req, res, next);
  res.status(statusCodes?.ok).send(TagUpdateData);
};

export default {
  TagAdd,
  TagFetch,
  TagDelete,
  TagUpdate,
  GetAlltag,
};
