import * as judgeService from "../services/Judge.js";
import { Message, statusCodes } from "../core/common/constant.js";
const JudgeAdd = async (req, res, next) => {
  const JudgeData = await judgeService.AddJudge(req, res, next);
  res.status(statusCodes?.created).send(JudgeData);
};
const JudgeFetch = async (req, res, next) => {
  const JudgeData = await judgeService.GetJudge(req, res, next);
  res.status(statusCodes?.ok).send(JudgeData);
};
const GetAlljudge = async (req, res, next) => {
  const JudgeData = await judgeService.GetAllJudges(req, res, next);
  res.status(statusCodes?.ok).send(JudgeData);
};
const JudgeDelete = async (req, res, next) => {
  const JudgeDelData = await judgeService.DeleteJudge(req, res, next);
  res.status(statusCodes?.ok).send(JudgeDelData);
};
const JudgeUpdate = async (req, res, next) => {
  const JudgeUpdateData = await judgeService.UpdateJudge(req, res, next);
  res.status(statusCodes?.ok).send(JudgeUpdateData);
};

export default {
  JudgeAdd,
  JudgeFetch,
  JudgeDelete,
  JudgeUpdate,
  GetAlljudge,
};
